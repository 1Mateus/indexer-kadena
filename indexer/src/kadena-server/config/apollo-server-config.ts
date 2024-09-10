import { readFileSync } from "fs";
import { rootPgPool } from "../../config/database";
import { join } from "path";
import { Pool } from "pg";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "../resolvers";

const typeDefs = readFileSync(join(__dirname, "./schema.graphql"), "utf-8");
const schema = makeExecutableSchema({ typeDefs, resolvers });

export type ResolverContext = { db: Pool };

export const apolloServerConfig = {
  schema,
  context: (): ResolverContext => ({
    db: rootPgPool,
  }),
};
