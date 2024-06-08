import { fetchProducts } from '../../api/product';
import { PAGE_INTERVAL, SIZE } from '../../constants/api';
import { Product } from '../../types/Product.type';
import { Option } from '../../types/Option.type';
import { QUERY_KEYS } from '../../api/queryKeys';
import { useContext, useEffect } from 'react';
import { ToastContext } from '../../context/ToastProvider';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  isLast: boolean;
  handlePage: () => void;
}

const getProducts = async ({ pageParam, category, sort }: { pageParam: number; category: Option; sort: Option }) => {
  const response = await fetchProducts(category.key, pageParam, SIZE.ADDITIONAL, sort.key);
  const pageInterval = pageParam === 0 ? PAGE_INTERVAL.INITIAL : PAGE_INTERVAL.DEFAULT;
  return {
    data: response.data,
    isLast: response.isLast,
    nextPage: response.isLast ? null : pageParam + pageInterval,
  };
};

const useFetchProducts = (category: Option, sort: Option): UseFetchProductsResult => {
  const { showToast } = useContext(ToastContext);

  const { data, error, status, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, category, sort],
    queryFn: ({ pageParam }) => getProducts({ pageParam, category, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    networkMode: 'always',
    retry: false,
  });

  const products = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (status === 'error' && error) {
      showToast((error as Error).message);
    }
  }, [status, error]);

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    products,
    loading: isFetching || isFetchingNextPage,
    error,
    isLast: !hasNextPage,
    handlePage,
  };
};

export default useFetchProducts;