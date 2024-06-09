import apiClient from './apiClient';
import { SIZE } from '../constants/api';
import { API_ENDPOINTS } from './endpoints';
import { CartItem } from '../types/CartItem.type';
import { ERROR_MESSAGES } from '../constants/message';

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

export const updateCartItemQuantity = async (cartItemId: number, quantity: number): Promise<void> => {
  return apiClient.patch({
    endpoint: `${API_ENDPOINTS.CART}/${cartItemId}`,
    body: { quantity },
    errorMessage: ERROR_MESSAGES.UPDATE_CART_ITEMS_QUANTITY,
  });
};
