import { act, renderHook, waitFor } from '@testing-library/react';
import useCartItems from './useCartItems';
import cartItemsData from '../../mocks/cartItem/cartItem.json';

describe('useCartItems', () => {
  describe('장바구니 아이템 조회', () => {
    it('장바구니 아이템을 조회한다.', async () => {
      const { result } = renderHook(() => useCartItems());

      await waitFor(() => {
        expect(result.current.cartItems).toHaveLength(5);
      });
    });
  });

  describe('장바구니에 아이템 담기', () => {
    it('장바구니에 아이템을 담을 수 있다.', async () => {
      const { result } = renderHook(() => useCartItems());

      act(() => {
        result.current.handleAddCartItem(10);
      });

      await waitFor(() => {
        expect(result.current.cartItems).toHaveLength(6);
      });
    });
  });

  describe('장바구니에서 아이템 빼기', () => {
    it('장바구니에 아이템을 제거할 수 있다.', async () => {
      const { result } = renderHook(() => useCartItems());

      act(() => {
        result.current.setCartItems(cartItemsData);
      });

      act(() => {
        result.current.handleDeleteCartItem(10);
      });

      await waitFor(() => {
        expect(result.current.cartItems).toHaveLength(5);
      });
    });
  });
});
