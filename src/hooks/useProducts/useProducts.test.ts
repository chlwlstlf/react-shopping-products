import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { act, renderHook, waitFor } from '@testing-library/react';
import useProduct from './useProducts';
import { CATEGORY_LIST, SORTING_LIST } from '../../constants/optionList';
import API_ENDPOINTS from '../../api/endpoints';
import { PAGE_INTERVAL, SIZE } from '../../constants/api';

describe('useProduct', () => {
  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProduct(CATEGORY_LIST[0], SORTING_LIST[0]));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('상품 목록 조회 중 로딩 상태가 된다.', () => {
      const { result } = renderHook(() => useProduct(CATEGORY_LIST[0], SORTING_LIST[0]));

      expect(result.current.loading).toBe(true);
    });

    it('상품 목록 조회 중 에러가 발생하면 에러 상태가 된다.', async () => {
      server.use(
        http.get(`${API_ENDPOINTS.PRODUCT}`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderHook(() => useProduct(CATEGORY_LIST[0], SORTING_LIST[0]));

      await waitFor(() => {
        expect(result.current.error).toBe(true);
      });
    });
  });

  describe('페이지네이션', () => {
    it(`초기에 첫 페이지의 상품 ${SIZE.DEFAULT}개를 불러온다`, async () => {
      const { result } = renderHook(() => useProduct(CATEGORY_LIST[0], SORTING_LIST[0]));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(SIZE.DEFAULT);
        expect(result.current.page).toBe(0);
      });
    });

    it(`다음 페이지의 상품 ${SIZE.ADDITIONAL}개를 추가로 불러온다`, async () => {
      const { result } = renderHook(() => useProduct(CATEGORY_LIST[0], SORTING_LIST[0]));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(SIZE.DEFAULT);
        expect(result.current.page).toBe(0);
      });

      act(() => {
        result.current.handlePage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(SIZE.DEFAULT + SIZE.ADDITIONAL);
        expect(result.current.page).toBe(PAGE_INTERVAL.INITIAL);
      });
    });

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderHook(() => useProduct(CATEGORY_LIST[0], SORTING_LIST[0]));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(SIZE.DEFAULT);
      });

      for (let i = 5; i < 25; i++) {
        await waitFor(() => {
          act(() => {
            result.current.handlePage();
          });
        });

        const expectedLength = SIZE.DEFAULT + (i - SIZE.ADDITIONAL) * SIZE.ADDITIONAL;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
          expect(result.current.page).toBe(i);
        });
      }

      await act(async () => {
        result.current.handlePage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(100);
        expect(result.current.page).toBe(24);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.', async () => {
      const { result } = renderHook(() => useProduct(CATEGORY_LIST[0], SORTING_LIST[0]));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.handlePage();
      });

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('상품 목록 필터링 및 정렬', () => {
    it.each([
      [CATEGORY_LIST[0].name, CATEGORY_LIST[0]],
      [CATEGORY_LIST[1].name, CATEGORY_LIST[1]],
      [CATEGORY_LIST[2].name, CATEGORY_LIST[2]],
      [CATEGORY_LIST[3].name, CATEGORY_LIST[3]],
      [CATEGORY_LIST[4].name, CATEGORY_LIST[4]],
    ])('상품 목록을 카테고리 %s 별로 필터링하여 조회한다.', async (_, category) => {
      const { result } = renderHook(() => useProduct(category, SORTING_LIST[0]));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(SIZE.DEFAULT);
        category.key !== 'all' && expect(result.current.products[0].category).toBe(category.key);
      });
    });

    it.each([
      [SORTING_LIST[0].name, SORTING_LIST[0], 1000],
      [SORTING_LIST[1].name, SORTING_LIST[1], 1500000],
    ])('상품 목록을 %s으로 정렬하여 조회한다.', async (_, option, price) => {
      const { result } = renderHook(() => useProduct(CATEGORY_LIST[0], option));

      await waitFor(() => {
        expect(result.current.products[0].price).toBe(price);
      });
    });
  });
});
