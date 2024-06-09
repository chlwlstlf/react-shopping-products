import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCartItems } from '../../api/cart';
import { SIZE } from '../../constants/api';
import { QUERY_KEYS } from '../../api/queryKeys';
import { CartItem } from '../../types/CartItem.type';
import { ToastContext } from '../../context/ToastProvider';

const getCartItems = async () => {
  const { data: initialData, totalElements } = await fetchCartItems(SIZE.DEFAULT);
  if (totalElements <= SIZE.DEFAULT) {
    return initialData;
  }
  const { data: totalData } = await fetchCartItems(totalElements);
  return totalData;
};

const useFetchCartItems = (): { cartItems: CartItem[]; status: 'error' | 'success' | 'pending' } => {
  const { showToast } = useContext(ToastContext);

  const {
    data: cartItems = [],
    status,
    error,
  } = useQuery<CartItem[], Error>({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartItems,
    staleTime: 3600000,
    networkMode: 'always',
    retry: false,
  });

  useEffect(() => {
    if (status === 'error' && error) {
      showToast((error as Error).message);
    }
  }, [status, error]);

  return { cartItems, status };
};

export default useFetchCartItems;
