import { PageInfo } from "../config/graphql-types";

interface Params {
  rows: Array<any>;
  first?: number | null;
  last?: number | null;
}

export const getPageInfo = ({ first, last, rows }: Params): PageInfo => {
  const length = rows.length;
  const hasNextPage: boolean = Boolean(first && length === first);
  const hasPreviousPage: boolean = Boolean(last && length === last);

  const startCursor = !!length ? rows[0].id.toString() : null;
  const endCursor = !!length ? rows[rows.length - 1].id.toString() : null;

  const pageInfo = {
    startCursor,
    endCursor,
    hasNextPage,
    hasPreviousPage,
  };

  return pageInfo;
};
