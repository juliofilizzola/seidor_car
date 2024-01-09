export interface IPagination<T> {
  data: T[];
  count: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}

export interface IBodyPagination<T> {
  total: number;
  result: T[];
  page: number;
  limit: number;
}
export function paginateResponse<T>(data: IBodyPagination<T>): IPagination<T> {
  const { total, limit, page, result } = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  return {
    data: result,
    count: total,
    currentPage: page,
    nextPage,
    prevPage,
    lastPage,
  };
}
