const fs = require("fs");

import { Sequelize } from "sequelize";

import { getRequiredEnvString } from "../utils/helpers";
import path from "path";
import { Pool } from "pg";

const DB_USERNAME = getRequiredEnvString("DB_USERNAME");
const DB_PASSWORD = getRequiredEnvString("DB_PASSWORD");
const DB_NAME = getRequiredEnvString("DB_NAME");
const DB_HOST = getRequiredEnvString("DB_HOST");
const SSL_CERT_PATH = path.resolve(__dirname, "../config/global-bundle.pem");
const DB_CONNECTION = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?ssl=true&&sslrootcert=${SSL_CERT_PATH}`;

export const rootPgPool = new Pool({
  connectionString: DB_CONNECTION,
});

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    pool: {
      max: 20,
      min: 1,
      acquire: 60000,
      idle: 10000,
    },
    retry: {
      max: 10,
    },
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(__dirname + "/global-bundle.pem").toString(),
      },
    },
  }
);

export async function initializeDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }

  try {
    await sequelize.sync({ force: false });

    console.log("Tables have been synchronized successfully.");

    // Create the update_balances function
    await sequelize.query(`
  CREATE OR REPLACE FUNCTION update_balances() RETURNS TRIGGER AS $$
  DECLARE
      sender_balance numeric;
      recipient_balance numeric;
      contract_id int4;
  BEGIN
      -- Retrieve contractId
      SELECT id INTO contract_id
      FROM public."Contracts"
      WHERE "network" = NEW.network
        AND "chainId" = NEW."chainId"
        AND "module" = NEW.modulename
        AND "tokenId" IS NOT DISTINCT FROM NEW."tokenId"
      LIMIT 1;

      -- Update sender balance
      SELECT "balance" INTO sender_balance
      FROM public."Balances"
      WHERE "account" = NEW.from_acct
        AND "chainId" = NEW."chainId"
        AND "qualname" = NEW.modulename
        AND "network" = NEW.network
        AND "tokenId" IS NOT DISTINCT FROM NEW."tokenId"
      FOR UPDATE;

      IF FOUND THEN
          UPDATE public."Balances"
          SET balance = sender_balance - NEW.amount,
              "contractId" = contract_id
          WHERE "account" = NEW.from_acct
            AND "chainId" = NEW."chainId"
            AND "qualname" = NEW.modulename
            AND "network" = NEW.network
            AND "tokenId" IS NOT DISTINCT FROM NEW."tokenId";
      ELSE
          INSERT INTO public."Balances" (account, "chainId", balance, module, qualname, "tokenId", network, "createdAt", "updatedAt", "hasTokenId", "contractId")
          VALUES (NEW.from_acct, NEW."chainId", -NEW.amount, NEW.modulename, NEW.modulename, NEW."tokenId", NEW.network, NEW."createdAt", NEW."updatedAt", 
          CASE WHEN NEW."tokenId" IS NOT NULL THEN true ELSE false END, contract_id);
      END IF;

      -- Update recipient balance
      SELECT balance INTO recipient_balance
      FROM public."Balances"
      WHERE "account" = NEW.to_acct
        AND "chainId" = NEW."chainId"
        AND "qualname" = NEW.modulename
        AND "network" = NEW.network
        AND "tokenId" IS NOT DISTINCT FROM NEW."tokenId"
      FOR UPDATE;

      IF FOUND THEN
          UPDATE public."Balances"
          SET balance = recipient_balance + NEW.amount,
              "contractId" = contract_id
          WHERE "account" = NEW.to_acct
            AND "chainId" = NEW."chainId"
            AND "qualname" = NEW.modulename
            AND "network" = NEW.network
            AND "tokenId" IS NOT DISTINCT FROM NEW."tokenId";
      ELSE
          INSERT INTO public."Balances" (account, "chainId", balance, module, qualname, "tokenId", network, "createdAt", "updatedAt", "hasTokenId", "contractId")
          VALUES (NEW.to_acct, NEW."chainId", NEW.amount, NEW.modulename, NEW.modulename, NEW."tokenId", NEW.network, NEW."createdAt", NEW."updatedAt", 
          CASE WHEN NEW."tokenId" IS NOT NULL THEN true ELSE false END, contract_id);
      END IF;

      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`);

    // Create the trigger
    await sequelize.query(`
CREATE OR REPLACE TRIGGER update_balances_trigger
AFTER INSERT ON public."Transfers"
FOR EACH ROW
EXECUTE FUNCTION update_balances();
`);

    // Create the Balances table
    await sequelize.query(`
  CREATE TABLE IF NOT EXISTS public."Balances" (
    id serial4 NOT NULL,
    account varchar(255) NOT NULL,
    "chainId" int4 NOT NULL,
    balance numeric(50) DEFAULT 0 NOT NULL,
    "module" varchar(255) NOT NULL,
    qualname varchar(255) NOT NULL,
    "tokenId" varchar(255) NULL,
    network varchar(255) NOT NULL,
    "hasTokenId" boolean DEFAULT false NOT NULL,
    "contractId" int4 NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    CONSTRAINT "Balances_pkey" PRIMARY KEY (id)
  );
  
  DO $$
  BEGIN
      IF NOT EXISTS (
          SELECT 1
          FROM pg_indexes
          WHERE schemaname = 'public'
            AND tablename = 'Balances'
            AND indexname = 'balance_unique_constraint'
      ) THEN
          CREATE UNIQUE INDEX balance_unique_constraint ON public."Balances" USING btree (network, "chainId", account, qualname, "tokenId");
      END IF;
  END $$;
`);

    // Create missing_block_ranges view
    await sequelize.query(`
CREATE OR REPLACE VIEW missing_block_ranges AS
WITH missing_ranges AS (
  SELECT DISTINCT 
    "chainId", 
    "chainwebVersion", 
    height + 1 AS missing_start, 
    next_height - 1 AS missing_end
  FROM (
    SELECT 
      "chainId", 
      "chainwebVersion", 
      height, 
      LEAD(height) OVER (PARTITION BY "chainId", "chainwebVersion" ORDER BY height) AS next_height
    FROM "Blocks"
  ) AS t
  WHERE next_height IS NOT NULL AND next_height <> height + 1
)
SELECT DISTINCT 
  "chainId", 
  "chainwebVersion", 
  missing_start AS from_height, 
  missing_end AS to_height, 
  (missing_end - missing_start) AS diff
FROM missing_ranges
where (missing_end - missing_start) >= 0
ORDER BY "chainId", "chainwebVersion", missing_start ASC;
`);

    console.log("Trigger function and trigger have been created successfully.");
  } catch (error) {
    console.error("Unable to create tables:", error);
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  try {
    await sequelize.close();
    console.log("Connection has been closed successfully.");
  } catch (error) {
    console.error("Unable to close the connection:", error);
    throw error;
  }
}
