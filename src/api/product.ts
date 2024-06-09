import apiClient from './apiClient';
import { SIZE } from '../constants/api';
import { API_ENDPOINTS } from './endpoints';
import { Product } from '../types/Product.type';
import { ERROR_MESSAGES } from '../constants/message';

interface ProductApi {
  data: Product[];
  isLast: boolean;
}

const makeParams = (category: string, page: number, size: number, sort: string): string => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: (page === 0 ? SIZE.DEFAULT : size).toString(),
    sort: `price,${sort}`,
  });

  if (category && category !== 'all') {
    params.append('category', category);
  }

  return params.toString();
};

export const fetchProducts = async (
  category: string,
  page: number,
  size: number,
  sort: string,
): Promise<ProductApi> => {
  const endpoint = `${API_ENDPOINTS.PRODUCT}?${makeParams(category, page, size, sort)}`;
  const data = await apiClient.get({ endpoint, errorMessage: ERROR_MESSAGES.FETCH_PRODUCT });

  return { data: data.content, isLast: data.last };
};
