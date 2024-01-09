import { paginateResponse } from './pagination';

describe('paginateResponse', () => {
  const dataPagination = {
    total: 10,
    result: [1, 2, 3, 4, 5],
  };

  it('should return correctly structured response when pagination data is provided', () => {
    const response = paginateResponse<number>({
      total: dataPagination.total,
      page: 1,
      limit: 5,
      result: dataPagination.result,
    });

    expect(response).toEqual({
      data: [1, 2, 3, 4, 5],
      count: 10,
      currentPage: 1,
      nextPage: 2,
      prevPage: null,
      lastPage: 2,
    });
  });

  it('should correctly calculate prevPage and nextPage', () => {
    const responsePageTwo = paginateResponse<number>({
      total: dataPagination.total,
      page: 2,
      limit: 5,
      result: dataPagination.result,
    });
    expect(responsePageTwo.prevPage).toEqual(1);
    expect(responsePageTwo.nextPage).toBeNull();
  });

  it('should handle cases where pages are outside limits', () => {
    const responsePageZero = paginateResponse<number>({
      total: dataPagination.total,
      page: 0,
      limit: 5,
      result: dataPagination.result,
    });
    expect(responsePageZero.prevPage).toBeNull();

    const responsePageOver = paginateResponse<number>({
      total: dataPagination.total,
      page: 5,
      limit: 5,
      result: dataPagination.result,
    });
    expect(responsePageOver.nextPage).toBeNull();
  });
});
