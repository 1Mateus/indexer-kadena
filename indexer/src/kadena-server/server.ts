import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { apolloServerConfig } from "./config/apollo-server-config";

const KADENA_GRAPHQL_PORT = 4001;

const app = express();
app.use(cors());

export async function useKadenaGraphqlServer() {
  const server = new ApolloServer(apolloServerConfig);

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: KADENA_GRAPHQL_PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${KADENA_GRAPHQL_PORT}${server.graphqlPath}`
    );
  });
}

export { app };
