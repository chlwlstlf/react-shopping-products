import { useState } from 'react';
import { PAGE_INTERVAL } from '../constants/api';

interface UsePaginationResult {
  page: number;
  resetPage: () => void;
  moveNextPage: (loading: boolean, isLast: boolean) => void;
}

const usePagination = (): UsePaginationResult => {
  const [page, setPage] = useState(0);

  const resetPage = () => setPage(0);

  const moveNextPage = (loading: boolean, isLast: boolean) => {
    if (!loading && !isLast) {
      setPage((prevPage) => (prevPage === 0 ? PAGE_INTERVAL.INITIAL : prevPage + PAGE_INTERVAL.DEFAULT));
    }
  };

  return { page, resetPage, moveNextPage };
};

export default usePagination;
