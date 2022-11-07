import express from 'express'
import { ApolloServer } from 'apollo-server-express';

import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/schema'

const app = express()

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path:'/' });
}
startServer();


app.listen('4000', () => {
  console.log('GraphQL is now running on http://localhost:4000/')
})