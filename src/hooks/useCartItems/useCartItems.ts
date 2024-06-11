import { useState, useEffect } from 'react';
import useFetcher from '../useFetcher';
import { fetchCartItems, deleteCartItem, addCartItem } from '../../api/cart';
import { CartItem } from '../../types/CartItem.type';
import { SIZE } from '../../constants/api';

interface UseCartItemsResult {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  loading: boolean;
  error: unknown;
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
}

const useCartItems = (): UseCartItemsResult => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { loading, error, fetcher } = useFetcher();

  useEffect(() => {
    fetcher(getCartItems);
  }, []);

  const getCartItems = async () => {
    const { data: initialData, totalElements } = await fetchCartItems(SIZE.DEFAULT);

    if (totalElements <= SIZE.DEFAULT) {
      setCartItems(initialData);
      return;
    }

    const { data: totalData } = await fetchCartItems(totalElements);
    setCartItems(totalData);
  };

  const handleAddCartItem = (productId: number) => {
    fetcher(async () => {
      await addCartItem(productId);
      await getCartItems();
    });
  };

  const handleDeleteCartItem = (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);

    if (cartItem) {
      fetcher(async () => {
        await deleteCartItem(cartItem.id);
        await getCartItems();
      });
    }
  };

  return {
    cartItems,
    setCartItems,
    loading,
    error,
    handleAddCartItem,
    handleDeleteCartItem,
  };
};

export default useCartItems;
