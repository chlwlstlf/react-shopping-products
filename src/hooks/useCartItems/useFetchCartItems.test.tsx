import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../../mocks/server';
import { HttpResponse, http } from 'msw';

import useFetchCartItems from './useFetchCartItems';
import { API_ENDPOINTS } from '../../api/endpoints';
import { createWrapper } from '../../utils/testUtils';

describe('useFetchCartItems', () => {
  describe('장바구니 아이템 조회', () => {
    it('장바구니 아이템을 조회한다.', async () => {
      const { result } = renderHook(() => useFetchCartItems(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.cartItems).toHaveLength(5);
      });
    });

    it('로딩 중인 상태를 표시한다.', async () => {
      const { result } = renderHook(() => useFetchCartItems(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.status).toBe('pending');
      });
    });

    it('에러 상태를 표시한다.', async () => {
      server.use(
        http.get(API_ENDPOINTS.CART, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderHook(() => useFetchCartItems(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.status).toBe('error');
      });
    });
  });
});
