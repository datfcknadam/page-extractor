/**
 * Dto fabric for payload fetch function
 * @param {number} page
 * @param {number} offset
 * @returns {T}
 */
export type DtoFabric<T> = (page: number, offset: number) => T;