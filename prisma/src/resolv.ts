//import { makeExecutableSchema } from "graphql-tools";
import { makeExecutableSchema, mergeSchemas } from "apollo-server-express";
import { readFileSync } from "fs";
import { storeFS, storeDB, lwdb, existInDB } from "./lowdb";
import promisesAll from "promises-all";
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
import { GraphQLUpload } from "apollo-upload-server";

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload;

  const el = existInDB(filename);
  if (el.length > 0) {
    var out = el.map(a => Object.assign({}, a));
    stream.resume();
    stream.on("end", () => {
      console.log("got to the end, but did not read anything");
    });
    return out[0];
  } else {
    const { id, path } = await storeFS({ stream, filename });
    return storeDB({ id, filename, mimetype, encoding, path });
  }
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
    uploads: () => lwdb.get("uploads").value()
  },
  Mutation: {
    ...preparedTopLevelMutationResolvers,
    singleUpload: (obj, { file }, ctx) => processUpload(file),
    async multipleUpload(obj, { files }) {
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
    //...preparedTopLevelSubscriptionResolvers,
    organization: {
      subscribe: async (parent, args, context, info) => {
        return await context.db.subscription.organization({}, info);
      }
    },
    picture: {
      subscribe: async (parent, args, context, info) => {
        return await context.db.subscription.picture({}, info);
      }
    },
    stage: {
      subscribe: async (parent, args, context, info) => {
        return await context.db.subscription.stage({}, info);
      }
    },
    pipeline: {
      subscribe: async (parent, args, context, info) => {
        return await context.db.subscription.pipeline({}, info);
      }
    },
    product: {
      subscribe: async (parent, args, context, info) => {
        return await context.db.subscription.product({}, info);
      }
    },
    person: {
      subscribe: async (parent, args, context, info) => {
        return await context.db.subscription.person({}, info);
      }
    },
    user: {
      subscribe: async (parent, args, context, info) => {
        return await context.db.subscription.user({}, info);
      }
    },
    deal: {
      subscribe: async (parent, args, context, info) => {
        return await context.db.subscription.deal({}, info);
      }
    }
    /*organization: {
      subscribe: async (parent, args, context, info) => {
        console.log(info);
        const test = await context.db.subscription.organization({}, info);
        return test;
      }
    }*/
  },
  User
};

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
