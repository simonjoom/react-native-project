//import { makeExecutableSchema } from "graphql-tools";
const {
  makeExecutableSchema,
  mergeSchemas
} = require("apollo-server-express");
import { readFileSync } from "fs";
var path = require("path");
import { parse } from "graphql";
const { importSchema } = require("graphql-import");
const { Prisma } = require("prisma-binding");
//import { Prisma } from "./generated/prisma";

//import Mutations from "./resolvers/Mutation";
//import { Query } from "./resolvers/Query/Query";
//import { Subscription } from "./resolvers/Subscription";
import { AuthPayload } from "./resolvers/AuthPayload";
import { User } from "./resolvers/Query/User";
import { extractFragmentReplacements } from "prisma-binding";
import {
  addMockFunctionsToSchema
} from "graphql-tools";
import {
  prepareTopLevelResolvers,
  prepareTopLevelSubscriptionResolvers,
  addFragmentToFieldResolvers
} from "./services/utilities";

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
  typeDefs: path.join(__dirname, "./generated/prisma.graphql"),
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
  Query: {
    ...preparedTopLevelQueryResolvers
    //...Query
  },
  Mutation: {
    ...preparedTopLevelMutationResolvers
    //  ...Mutations
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