import { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/product';
import usePagination from '../usePagination';
import useFetcher from '../useFetcher';
import { SIZE } from '../../constants/api';
import { Product } from '../../types/Product.type';
import { Option } from '../../types/Option.type';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  isLast: boolean;
  page: number;
  handlePage: () => void;
}

const useProducts = (category: Option, sort: Option): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLast, setIsLast] = useState(false);
  const { page, resetPage, moveNextPage } = usePagination();
  const { loading, error, fetcher } = useFetcher();

  useEffect(() => {
    resetPage();
  }, [category, sort]);

  useEffect(() => {
    fetcher(handleProducts);
  }, [page, category, sort]);

  const getProducts = async (category: Option, sort: Option) => {
    const { data, isLast } = await fetchProducts(category.key, page, SIZE.ADDITIONAL, sort.key);
    setProducts((prevProducts) => (page === 0 ? data : [...prevProducts, ...data]));
    setIsLast(isLast);
  };

  const handleProducts = () => getProducts(category, sort);

  const handlePage = () => moveNextPage(loading, isLast);

  return {
    products,
    loading,
    error,
    isLast,
    page,
    handlePage,
  };
};

export default useProducts;
