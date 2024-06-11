import { useState } from 'react';
import { Option } from '../types/Option.type';
import { CATEGORY_LIST, SORTING_LIST } from '../constants/optionList';

interface UseFilterAndSortResult {
  category: Option;
  sort: Option;
  handleCategory: (category: Option) => void;
  handleSort: (sort: Option) => void;
}

const useFilterAndSort = (): UseFilterAndSortResult => {
  const [category, setCategory] = useState<Option>(CATEGORY_LIST[0]);
  const [sort, setSort] = useState<Option>(SORTING_LIST[0]);

  const handleCategory = (newCategory: Option) => {
    setCategory(newCategory);
  };

  const handleSort = (newSort: Option) => {
    setSort(newSort);
  };

  return {
    category,
    sort,
    handleCategory,
    handleSort,
  };
};

export default useFilterAndSort;
