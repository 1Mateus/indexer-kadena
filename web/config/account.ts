import { blockchainTooltipData } from "./tooltips"

export const assetsTableColumns = [
  {
    cols: 3,
    key: 'asset',
    label: 'Asset',
    description: blockchainTooltipData.account.tabAssets.asset
  },
  {
    cols: 5,
    center: true,
    key: 'symbol',
    label: 'Symbol',
    description: blockchainTooltipData.account.tabAssets.symbol
  },
  {
    cols: 6,
    key: 'quantity',
    label: 'Quantity',
    description: blockchainTooltipData.account.tabAssets.quantity
  },
  {
    cols: 4,
    key: 'price',
    label: 'Price',
    description: blockchainTooltipData.account.tabAssets.price
  },
  {
    cols: 4,
    key: 'value',
    label: 'Value',
    description: blockchainTooltipData.account.tabAssets.value
  },
  {
    cols: 2,
    center: true,
    key: 'distribution',
    label: 'Distribution',
  },
]

export const statementTableColumns = [
  {
    cols: 6,
    key: 'createdAt',
    label: 'Date',
    description: blockchainTooltipData.account.tabAccountStatement.date
  },
  {
    cols: 6,
    key: 'description',
    label: 'Transaction description',
    description: blockchainTooltipData.account.tabAccountStatement.transactionDescription
  },
  {
    cols: 6,
    key: 'amount',
    label: 'Amount',
    description: blockchainTooltipData.account.tabAccountStatement.amount
  },
  {
    cols: 6,
    key: 'balance',
    label: 'Running Balance',
    description: blockchainTooltipData.account.tabAccountStatement.runningBalance
  },
]
