/**
 * @typedef {Object} Options
 * @property {number} pageSize count of elements per page @default 10
 * @property {number} pageLimit limit on count of chunks elements @default Infinite
 * @property {number} totalLimit limit on total elements @default Infinite
 * @property {boolean} orderRequired count of elements per page @default false
 */
export type Options = {
  pageSize: number,
  pageLimit: number,
  totalLimit: number, 
  orderRequired: boolean,
}