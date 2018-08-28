//import { makeExecutableSchema } from "graphql-tools";
import { makeExecutableSchema, mergeSchemas } from "apollo-server-express";
import { readFileSync } from "fs";
import { Context } from "./utils";
import {
  storeFS,
  storeDB,
  removeInDB,
  getDB,
  uploadsfromlistfilenameInDB,
  uploadsfromfilenameInDB
} from "./lowdb";
import promisesAll from "promises-all";
import { find } from "lodash";
var path = require("path");
import { parse } from "graphql";
import { importSchema } from "graphql-import";
//import { Prisma } from "prisma-binding";
import { Prisma } from "./generated/prisma";

//import Mutations from "./resolvers/Mutation";
//import { Query } from "./resolvers/Query/Query";
//import { Subscription } from "./resolvers/Subscription";
import { AuthPayload } from "./resolvers/AuthPayload";
import { User } from "./resolvers/Query/User";
const shortid = require("shortid");
import { extractFragmentReplacements } from "prisma-binding";
import { addMockFunctionsToSchema } from "graphql-tools";
import {
  prepareTopLevelResolvers,
  prepareTopLevelSubscriptionResolvers,
  addFragmentToFieldResolvers
} from "./services/utilities";
import { GraphQLUpload } from "@apollographql/apollo-upload-server";

const processUpload = upload => {
  // const { stream, filename, mimetype, encoding } = await upload;
  return new Promise((resolve, reject) => {
    return upload.then(({ stream, filename, mimetype, encoding }) => {
      const el = uploadsfromfilenameInDB(filename);
      if (el.length > 0) {
        var out = el.map(a => Object.assign({}, a));
        stream.resume();
        stream.on("end", () => {
          console.log("got to the end, but did not read anything");
        });
        console.log(out);
        resolve(out[0]);
      } else {
        console.log("processUpload");
        return storeFS({ stream, filename }).then(({ id, path }) => {
          console.log("processUploadstorefinish");
          storeDB({ id, filename, mimetype, encoding, path });
          resolve({ id, filename, mimetype, encoding, path });
        });
      }
    });
  });
};

const preparedFieldResolvers = addFragmentToFieldResolvers(
  parse(
    readFileSync(
      path.join(__dirname, "../database/datamodel.graphql")
    ).toString()
  ),
  `{ id }`
);
const generatedFragmentReplacements = extractFragmentReplacements(
  preparedFieldResolvers
);

export const db = new Prisma({
  // typeDefs: path.join(__dirname, "./generated/prisma.graphql"),
  endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
  secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
  debug: true // log all GraphQL queries & mutations
  //fragmentReplacements: generatedFragmentReplacements
});

const preparedTopLevelQueryResolvers = prepareTopLevelResolvers(db.query);
const preparedTopLevelMutationResolvers = prepareTopLevelResolvers(db.mutation);
const preparedTopLevelSubscriptionResolvers = prepareTopLevelSubscriptionResolvers(
  db.subscription
);
/*const preparedTopLevelSubscriptionResolvers = prepareTopLevelSubscriptionResolvers(
  db.subscription
);*/

/*
export default {
  Query,
  Mutation: {
    ...Mutations,
  },
  Subscription,
  AuthPayload,
  User,
}
*/

const directiveResolvers = {};

/*
  {
    all: true
  }*/
//writeFileSync(path.join(__dirname,'joined.graphql'), ultimateSchemaString)

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    ...preparedTopLevelQueryResolvers,
    getInfo: (obj, data, ctx) => {
      console.log("getInfo", data);
      find(getDB(), { filename: data.file });
    },
    bigpicture: async (obj, data, ctx: Context) => {
      const all = await resolvers.Query.bigpictures(obj, data, ctx);
      return all[0];
    },
    bigpictures: async (obj, data, ctx: Context) => {
      const filesets = await ctx.db.query.pictures(data);

      const test = filesets.map(pic => {
        const arr = pic.file.split(",");
        const picupload = uploadsfromlistfilenameInDB(arr);
        return {
          file: pic.file,
          upload: picupload,
          id: pic.id
        };
      });
      return test;
    },
    uploads: () => getDB()
  },
  Mutation: {
    ...preparedTopLevelMutationResolvers,
    singleUpload: async (obj, data, ctx) => {
      const out = await processUpload(data.file);
      return out;
    },
    upsertBigpicture: async (obj, data, ctx: Context, info) => {
      return await ctx.db.mutation.upsertPicture(data, `{id file }`);
    },
    deleteBigpicture: async (obj, data, ctx: Context, info) => {
      const pic = await ctx.db.query.picture(data);
      console.log("delete", pic);
      //const arr = pic.file.split(",");
      // const uploadout = await removeInDB(arr);
      // console.log(uploadout);
      await ctx.db.mutation.deletePicture(data, info);
      return pic;
    },
    multipleUpload: async (obj, { files }) => {
      const { resolve, reject } = await promisesAll.all(
        files.map(processUpload)
      );

      if (reject.length)
        reject.forEach(({ name, message }) =>
          // eslint-disable-next-line no-console
          console.error(`${name}: ${message}`)
        );

      return resolve;
    }
  },
  Subscription: {
    ...preparedTopLevelSubscriptionResolvers,
    bigpicture: {
      resolve: (payload, args, ctx: Context, info) => {
        const data = Object.assign({}, payload.picture);
        const pic = payload.picture.node && payload.picture.node.file;
        if (pic) {
          const arr = pic.split(",");
          data.node.upload = uploadsfromlistfilenameInDB(arr);
        }
        console.log("SUBSCRIPTION RESOLVER", data);
        return data;
      },
      subscribe: async (parent, args, ctx: Context, info) => {
        return await ctx.db.subscription.picture(
          {},
          `{
          mutation
        node {
          id
          file
        }
        previousValues {
          id
          file
        }
      }`
        );
      }
    }
  }
};
//console.log(db.subscription.organization)
const firstSchema = importSchema(
  path.join(__dirname, "./generated/prisma.graphql")
);
const secondSchema = importSchema(path.join(__dirname, "./schema.graphql"));
const schema = makeExecutableSchema({ typeDefs: firstSchema });
//addMockFunctionsToSchema({ schema });
const schema2 = makeExecutableSchema({ typeDefs: secondSchema });
//addMockFunctionsToSchema({ schema:schema2 });

//const schemas = [firstSchema, secondSchema];

export const ultimateSchema = mergeSchemas({
  schemas: [schema, schema2],
  resolvers
});
//console.log(ultimateSchema.getSubscriptionType().getFields())
