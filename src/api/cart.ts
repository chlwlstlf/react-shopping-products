import apiClient from './apiClient';
import { CartItem } from '../types/CartItem.type';
import { SIZE } from '../constants/api';
import { ERROR_MESSAGES } from '../constants/message';
import API_ENDPOINTS from './endpoints';
interface CartApi {
  data: CartItem[];
  totalElements: number;
}

export const fetchCartItems = async (size: number = SIZE.DEFAULT): Promise<CartApi> => {
  const data = await apiClient.get({
    endpoint: `${API_ENDPOINTS.CART}?size=${size}`,
    errorMessage: ERROR_MESSAGES.FETCH_CART_ITEMS,
  });

  return { data: data.content, totalElements: data.totalElements };
};

export const addCartItem = async (productId: number): Promise<void> => {
  return apiClient.post({
    endpoint: `${API_ENDPOINTS.CART}`,
    body: { productId },
    errorMessage: ERROR_MESSAGES.ADD_CART_ITEMS,
  });
};

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
  return apiClient.delete({
    endpoint: `${API_ENDPOINTS.CART}/${cartItemId}`,
    errorMessage: ERROR_MESSAGES.DELETE_CART_ITEMS,
  });
};
