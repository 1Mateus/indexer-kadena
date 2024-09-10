import {
  startBackFill,
  startRetryErrors,
  startMissingBlocksDaemon,
} from "./services/syncService";

import dotenv from "dotenv";
import { program } from "commander";
import { initializeDatabase } from "./config/database";
import { getRequiredEnvString } from "./utils/helpers";
import { startStreaming } from "./services/sync/streaming";
import { processS3HeadersDaemon } from "./services/sync/header";
import { usePostgraphile } from "./server/metrics";
import { useKadenaGraphqlServer } from "./kadena-server/server";

program
  .option("-s, --streaming", "Start streaming blockchain data")
  .option("-b, --backfill", "Start back filling blockchain data")
  .option("-r, --retry", "Start retrying failed blocks")
  .option("-m, --missing", "Process missing blocks")
  .option("-h, --headers", "Process headers from s3 bucket to database")
  .option("-g, --graphql", "Start the GraphQL server")
  .option("-t, --graphqlServer", "Start the custom GraphQL server")
  .option(
    "-run, --run",
    "Continuous process of streaming, headers, payloads and missing blocks from node to s3 bucket and from s3 bucket to database"
  );

program.parse(process.argv);

const SYNC_NETWORK = getRequiredEnvString("SYNC_NETWORK");

const options = program.opts();

/**
 * Main function to orchestrate the blockchain data synchronization process.
 * It initializes the database and starts the requested synchronization process based on the command line arguments.
 */
async function main() {
  try {
    console.log("Loading environment variables...");
    dotenv.config();
    console.log("Initializing database...");
    await initializeDatabase();

    if (options.streaming) {
      await startStreaming(SYNC_NETWORK);
    } else if (options.backfill) {
      await startBackFill(SYNC_NETWORK);
    } else if (options.retry) {
      await startRetryErrors(SYNC_NETWORK);
    } else if (options.missing) {
      await startMissingBlocksDaemon(SYNC_NETWORK);
    } else if (options.headers) {
      await processS3HeadersDaemon(SYNC_NETWORK);
    } else if (options.graphql) {
      await usePostgraphile();
    } else if (options.graphqlServer) {
      await useKadenaGraphqlServer();
    } else if (options.run) {
      if (process.env.RUN_GRAPHQL_ON_START === "true") {
        await usePostgraphile();
      }
      if (process.env.RUN_STREAMING_ON_START === "true") {
        startStreaming(SYNC_NETWORK);
        processS3HeadersDaemon(SYNC_NETWORK);
      }
    } else {
      console.log("No specific task requested.");
    }
    console.log("Blockchain data indexing process has finished.");
  } catch (error) {
    console.error("An error occurred during the data indexing process:", error);
  }
}

/**
 * Handles graceful shutdown of the application when receiving termination signals.
 * @param signal The signal received, triggering the shutdown process.
 */
async function handleGracefulShutdown(signal: string) {
  console.log(`Received ${signal}. Graceful shutdown start.`);
  console.log("Graceful shutdown complete.");
  process.exit(0);
}

process.on("SIGINT", handleGracefulShutdown);
process.on("SIGTERM", handleGracefulShutdown);

main().then(() => console.log("Done!"));
