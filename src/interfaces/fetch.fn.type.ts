import { DtoFabric } from "./dto.fabric.type";

export type FetchFn<T, Dto> = (dto: DtoFabric<Dto>) => Promise<{ data: T[], total: number }>;