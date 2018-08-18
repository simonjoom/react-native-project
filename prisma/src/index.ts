var express = require('express') 
const { ApolloServer } = require("apollo-server-express");

//import { formatError } from 'apollo-errors';
import { mailer } from "./third-party/nodemailer";

//import resolvers from './resolvers';
import { ultimateSchema, db, resolvers } from "./resolv";

var app = express()
//app.use(cors({credentials: true, origin: true}))

const options = {
  port: 4000,
  //formatError,
  subscriptions: "/subscriptions",
  playground: "/playground"
  //debug: true
};
/*
const resolvers = {
  Query: { 
  },
  Mutation: { 
  },
  Subscription: {
    organization: {
      subscribe: (_, args, ctx, info) => {
        return ctx.db.subscription.organization({}, info)
      },
    },
  },
}*/
//const jwtCheck = jwt({ secret: process.env.JWT_SECRET }); // change out your secret for each environment
//app.use(path, jwtCheck);

export const server = new ApolloServer({
  schema: ultimateSchema,
  subscriptions: "/subscriptions", 
  cors: true, 
  context: ({ req, res }) => ({
    ...req,
    db,
    mailer
  })
}); 
server.applyMiddleware({
  app,
  path:"/",
//  bodyParserConfig:true,
  cors: true
})