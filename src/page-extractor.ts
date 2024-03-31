import defaultOptions from "./defaults/options";
import { DtoFabric } from "./interfaces/dto.fabric.type";
import { FetchFn } from "./interfaces/fetch.fn.type";
import { Options } from "./interfaces/options.interface";

/**
 * pageExtractor 
 * @param {FetchFn} fetchFn function that will retrieve data 
 * @param {DtoFabric}  dtoFabric function for generate payload to fetchFn
 * @param {import('./interfaces/options.interface').Options} options options
 * @returns {Promise}
 */
export const pageExtractor = async <TResponse, TDto>(
  dtoFabric: DtoFabric<TDto>,
  fetchFn: FetchFn<TResponse, TDto>,
  options: Partial<Options>,
): Promise<TResponse[]> => {
  const opt = { ...defaultOptions, ...options };
  const dto = dtoFabric(1, 0);
  const response = await fetchFn(dto);
  const { pageSize: chunkSize, pageLimit: limitChunks, totalLimit: limitTotal, orderRequired } = opt;

  if (response.total <= chunkSize || limitChunks === 1) {
    return response.data;
  }
  const total = limitTotal < response.total ? limitTotal : response.total;
  const chunksContain = Math.ceil(total / chunkSize);
  const chunks = limitChunks < chunksContain ? limitChunks : chunksContain;

  const dummyChunks = new Array(chunks - 1).fill(null).map((_, index) => index + 2);
  const data = await Promise.all(dummyChunks.map(async (page) => {
      const dto = dtoFabric(page, chunkSize * (page - 1));
      return { result: await fetchFn(dto), page };
  }));
  if (orderRequired) {
    data.sort((a, b) => a.page - b.page);
  }
  return data.reduce((acc, current) => acc.concat(current.result.data), response.data);
}