import { makeExecutableSchema } from "graphql-tools";
import { readFileSync, writeFileSync } from "fs";
var path = require("path");
import { parse } from "graphql";
import { Prisma } from "./generated/prisma";

//import Mutations from "./resolvers/Mutation";
//import { Query } from "./resolvers/Query/Query";
//import { Subscription } from "./resolvers/Subscription";
import { AuthPayload } from "./resolvers/AuthPayload";
import { User } from "./resolvers/Query/User";
import { extractFragmentReplacements } from "prisma-binding";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";
import {
  prepareTopLevelResolvers,
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
  endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
  secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
  debug: true // log all GraphQL queries & mutations
  //fragmentReplacements: generatedFragmentReplacements
});

const preparedTopLevelQueryResolvers = prepareTopLevelResolvers(db.query);
const preparedTopLevelMutationResolvers = prepareTopLevelResolvers(db.mutation);

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

const ultimateSchemaString = mergeTypes(
  [
    //...fileLoader(path.join(__dirname,'../database'), { extensions: ['.graphql'] }),
    ...fileLoader(path.join(__dirname, "./generated"), {
      extensions: [".graphql"]
    }),
    ...fileLoader(path.join(__dirname, "."), { extensions: [".graphql"] })
    //readFileSync(path.join(__dirname,'./schema.graphql')).toString(),
  ],
  {
    all: true
  }
);

//writeFileSync(path.join(__dirname,'joined.graphql'), ultimateSchemaString)

export const resolvers = {
  Query: {
    ...preparedTopLevelQueryResolvers,
    //...Query
  },
  Mutation: {
    ...preparedTopLevelMutationResolvers,
  //  ...Mutations
  },
  AuthPayload,
  User
};

export const ultimateSchema = makeExecutableSchema({
  typeDefs: ultimateSchemaString,
  resolvers,
  directiveResolvers
});

//export const fragmentReplacements = extractFragmentReplacements(resolvers);
//export const fragmentReplacements = extractFragmentReplacements(resolvers)
