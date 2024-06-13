import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/product';
import { PAGE_INTERVAL, SIZE } from '../../constants/api';
import { QUERY_KEYS } from '../../api/queryKeys';
import { Product } from '../../types/Product.type';
import { Option } from '../../types/Option.type';

interface UseFetchProductsResult {
  products: Product[];
  loading: boolean;
  status: 'error' | 'success' | 'pending';
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
  const { data, status, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, category, sort],
    queryFn: ({ pageParam }) => getProducts({ pageParam, category, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    networkMode: 'always',
    retry: false,
  });

  const products = data?.pages.flatMap((page) => page.data) || [];

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    products,
    loading: isFetching || isFetchingNextPage,
    status,
    isLast: !hasNextPage,
    handlePage,
  };
};

export default useFetchProducts;
