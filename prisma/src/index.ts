import { GraphQLServer, Options } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import { mailer } from './third-party/nodemailer';

//import resolvers from './resolvers';
import { ultimateSchema, db,resolvers } from './resolv';

const options: Options = {
  port: 4000,
  formatError,
  playground: '/playground',
  debug: true
};


export const server = new GraphQLServer({
  //typeDefs: './prisma/src/schema.graphql',
  //resolvers,
  schema: ultimateSchema,
  context: req => ({
    ...req,
    db,
    mailer
  }),
});

server.start(options, () => console.log(`Server is running on http://localhost:4000`));