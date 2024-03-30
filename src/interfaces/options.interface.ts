/**
 * @typedef {Object} Options
 * @property {number} chunkSize count of elements per page @default 10
 * @property {number} limitChunks limit on count of chunks elements @default Infinite
 * @property {number} limitTotal limit on total elements @default Infinite
 * @property {boolean} orderRequired count of elements per page @default false
 */
export type Options = {
  chunkSize: number,
  limitChunks: number,
  limitTotal: number, 
  orderRequired: boolean,
}