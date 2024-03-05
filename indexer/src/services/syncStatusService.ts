import { Op, Sequelize } from "sequelize";
import SyncStatus, {
  SyncStatusAttributes,
  SOURCE_BACKFILL,
  SOURCE_STREAMING,
} from "../models/syncStatus";
import { getRequiredEnvNumber } from "../utils/helpers";

const SYNC_FETCH_INTERVAL_IN_BLOCKS_FILLING = getRequiredEnvNumber(
  "SYNC_FETCH_INTERVAL_IN_BLOCKS"
);
const SYNC_FETCH_INTERVAL_IN_BLOCKS_STREAMING = 1;

/**
 * Saves or updates the sync status in the database.
 * If an existing sync status matches the given parameters, it updates that record.
 * Otherwise, it creates a new sync status record.
 * @param lastSyncData The last sync data to save.
 * @returns The saved or updated sync status.
 */
export class SyncStatusService {
  async save(
    lastSyncData: SyncStatusAttributes
  ): Promise<SyncStatusAttributes> {
    try {
      const parsedData = {
        ...lastSyncData,
      };

      let filter = {};

      if (lastSyncData.source === SOURCE_STREAMING) {
        const LAST_BLOCK_IN_DB =
          lastSyncData.fromHeight - SYNC_FETCH_INTERVAL_IN_BLOCKS_STREAMING;
        filter = {
          where: {
            [Op.and]: [
              { network: lastSyncData.network },
              { chainId: lastSyncData.chainId },
              { source: lastSyncData.source },
              {
                [Op.or]: [
                  {
                    fromHeight: LAST_BLOCK_IN_DB,
                  },
                  {
                    fromHeight: lastSyncData.toHeight,
                  },
                ],
              },
            ],
          },
        };
      } else if (lastSyncData.source === SOURCE_BACKFILL) {
        const LAST_BLOCK_IN_DB =
          lastSyncData.toHeight + (SYNC_FETCH_INTERVAL_IN_BLOCKS_FILLING + 1);

        filter = {
          where: {
            [Op.and]: [
              { network: lastSyncData.network },
              { chainId: lastSyncData.chainId },
              { source: lastSyncData.source },
              {
                [Op.or]: [
                  { toHeight: LAST_BLOCK_IN_DB },
                  {
                    toHeight: lastSyncData.toHeight,
                  },
                ],
              },
            ],
          },
        };
      }

      const existingBlock = await SyncStatus.findOne(filter);

      if (existingBlock) {
        if (lastSyncData.source === SOURCE_STREAMING) {
          parsedData.toHeight = existingBlock.toHeight;
        } else if (lastSyncData.source == SOURCE_BACKFILL) {
          parsedData.fromHeight = existingBlock.fromHeight;
        }
        await existingBlock.update(parsedData);
        console.log("Sync status updated in database:", existingBlock.toHeight);
        return existingBlock.toJSON() as SyncStatusAttributes;
      } else {
        const block = await SyncStatus.create(parsedData);
        console.log("Sync status saved in database:", block.toHeight);
        return block.toJSON() as SyncStatusAttributes;
      }
    } catch (error) {
      console.error("Error saving last synced status:", error);
      throw error;
    }
  }

  /**
   * Finds a specific sync status record based on chain ID, network, and source.
   * @param chainId The chain ID of the sync status to find.
   * @param network The network of the sync status to find.
   * @param source The source of the sync status to find.
   * @returns The found sync status or null if no matching record is found.
   */
  async find(
    chainId: number,
    network: string,
    source: string
  ): Promise<SyncStatusAttributes | null> {
    try {
      const block = await SyncStatus.findOne({
        where: { chainId, network, source },
      });
      return block ? (block.toJSON() as SyncStatusAttributes) : null;
    } catch (error) {
      console.error("Error finding block:", error);
      throw error;
    }
  }

  /**
   * Retrieves the last sync status for all chains within a specific network and source.
   * This method groups the results by chain ID and calculates the minimum 'toHeight'
   * and maximum 'fromHeight' for each chain.
   * @param network The network to filter the sync statuses.
   * @param source The sources to filter the sync statuses.
   * @returns An array of sync statuses for each chain.
   */
  async getLastSyncForAllChains(
    network: string,
    source: string[]
  ): Promise<SyncStatusAttributes[]> {
    try {
      const block = await SyncStatus.findAll({
        where: { network, source },
        group: ["chainId"],
        attributes: [
          "chainId",
          [Sequelize.fn("min", Sequelize.col("toHeight")), "toHeight"],
          [Sequelize.fn("max", Sequelize.col("fromHeight")), "fromHeight"],
        ],
      });
      return block.map((b) => b.toJSON() as SyncStatusAttributes);
    } catch (error) {
      console.error("Error getting last synced block for all chains:", error);
      throw error;
    }
  }

  /**
   * Retrieves a list of unique chain IDs for a given network.
   * This method is useful for identifying all chains that have sync status records in the database.
   * @param network The network to filter the chains.
   * @returns An array of unique chain IDs.
   */
  async getChains(network: string): Promise<number[]> {
    try {
      const block = await SyncStatus.findAll({
        where: { network },
        group: ["chainId"],
        attributes: ["chainId"],
        order: [["chainId", "ASC"]],
      });
      return block.map((b) => b.chainId);
    } catch (error) {
      console.error("Error getting chains:", error);
      throw error;
    }
  }

  /**
   * Calculates and returns the gaps (missing blocks) in the sync status records for a given chain and network.
   * This method identifies ranges of blocks that have not been synced based on the existing records.
   * @param network The network of the chain to check for missing blocks.
   * @param chainId The chain ID to check for missing blocks.
   * @returns An array of sync status attributes representing the gaps in synced blocks.
   */
  async getMissingBlocks(
    network: string,
    chainId: number
  ): Promise<SyncStatusAttributes[]> {
    try {
      const records = await SyncStatus.findAll({
        where: { chainId, network },
        order: [["toHeight", "DESC"]],
      });

      const missingBlocks = [] as SyncStatusAttributes[];
      let lastToHeight = 0;

      records.forEach((record, index) => {
        const syncStatus = record.toJSON() as SyncStatusAttributes;
        if (index === 0) {
          lastToHeight = syncStatus.toHeight;
          return;
        }

        const blockDiffs = lastToHeight - syncStatus.fromHeight - 1;
        if (blockDiffs > 0) {
          const fromHeight = lastToHeight - 1;
          const toHeight = fromHeight - (blockDiffs - 1);
          missingBlocks.push({
            network: syncStatus.network,
            chainId: syncStatus.chainId,
            fromHeight: fromHeight,
            toHeight: toHeight,
            key: "",
            source: "missingBlocks",
            id: 0,
          });
        }
        lastToHeight = syncStatus.toHeight;
      });

      return missingBlocks;
    } catch (error) {
      console.error("Error getting missing blocks:", error);
      throw error;
    }
  }
}

export const syncStatusService = new SyncStatusService();
