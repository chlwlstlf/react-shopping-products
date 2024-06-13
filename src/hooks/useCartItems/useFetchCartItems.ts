import { useQuery } from '@tanstack/react-query';
import { fetchCartItems } from '../../api/cart';
import { SIZE } from '../../constants/api';
import { QUERY_KEYS } from '../../api/queryKeys';
import { CartItem } from '../../types/CartItem.type';

const getCartItems = async () => {
  const { data: initialData, totalElements } = await fetchCartItems(SIZE.DEFAULT);
  if (totalElements <= SIZE.DEFAULT) {
    return initialData;
  }
  const { data: totalData } = await fetchCartItems(totalElements);
  return totalData;
};

const useFetchCartItems = (): { cartItems: CartItem[]; status: 'error' | 'success' | 'pending' } => {
  const { data: cartItems = [], status } = useQuery<CartItem[], Error>({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartItems,
    networkMode: 'always',
    retry: false,
  });

  return { cartItems, status };
};

export default useFetchCartItems;
