import defaultOptions from "./defaults/options";
import { FetchFn } from "./interfaces/fetch.fn.type";
import { Options } from "./interfaces/options.interface";

/**
 * pageExtractor 
 * @param {FetchFn} fetchFn function that will retrieve data 
 * @param {import('./interfaces/options.interface').Options} options options
 * @returns {Promise}
 */
export const pageExtractor = async <TResponse>(
  fetchFn: FetchFn<TResponse>,
  options: Partial<Options>,
): Promise<TResponse[]> => {
  const opt = { ...defaultOptions, ...options };
  const response = await fetchFn(1, 0);
  const { pageSize, pageLimit, totalLimit, orderRequired } = opt;

  if (response.total <= pageSize || pageLimit === 1) {
    return response.data;
  }
  const total = totalLimit < response.total ? totalLimit : response.total;
  const chunksContain = Math.ceil(total / pageSize);
  const chunks = pageLimit < chunksContain ? pageLimit : chunksContain;

  const dummyChunks = new Array(chunks - 1).fill(null).map((_, index) => index + 2);
  const data = await Promise.all(dummyChunks.map(async (page) => {
      return { result: await fetchFn(page, pageSize * (page - 1)), page };
  }));
  if (orderRequired) {
    data.sort((a, b) => a.page - b.page);
  }
  return data.reduce((acc, current) => acc.concat(current.result.data), response.data);
}