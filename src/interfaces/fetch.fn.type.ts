type Data<T> = { data: T[], total: number };
/**
 * Function for fetch data
 * @param { DtoFabric }
 * @returns {{ data: number, total: number }}
 */
export type FetchFn<T, Dto> = (dto: Dto) => Promise<Data<T>> | Data<T>;