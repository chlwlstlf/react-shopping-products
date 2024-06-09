import Layout from '../../components/Layout/Layout';
import CartModal from '../../components/cart/CartModal';
import ProductHeader from '../../components/product/ProductHeader';
import ProductItem from '../../components/product/ProductItem';
import { Dropdown, FloatingButton, LoadingSpinner } from '../../components/common';

import useFetchProducts from '../../hooks/useProducts/useFetchProducts';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useFilterAndSort from '../../hooks/useFilterAndSort';
import useModal from '../../hooks/useModal';

import { CATEGORY_LIST, SORTING_LIST } from '../../constants/optionList';
import * as S from './ProductListPage.style';

import EmptyCart from '../../assets/EmptyCart.png';

const ProductListPage = () => {
  const { category, sort, handleCategory, handleSort } = useFilterAndSort();
  const { products, loading, status, isLast, handlePage } = useFetchProducts(category, sort);
  const { isOpen, handleOpen, handleClose } = useModal();
  const targetRef = useIntersectionObserver(handlePage);

  const isAddPageAble = status !== 'error' && !isLast;

  return (
    <Layout>
      <CartModal isOpen={isOpen} onClose={handleClose} />

      <Layout.Header>
        <ProductHeader onOpen={handleOpen} />
      </Layout.Header>

      <Layout.Content>
        <Layout.Title mainTitle="텐파의 쇼핑몰" />

        <S.DropdownContainer>
          <Dropdown options={CATEGORY_LIST} selectedOption={category} updateOption={handleCategory} />
          <Dropdown options={SORTING_LIST} selectedOption={sort} updateOption={handleSort} />
        </S.DropdownContainer>

        {products.length > 0 ? (
          <S.ProductList>
            {products.map((product, index) => (
              <ProductItem key={`${product.id}-${index}`} product={product} />
            ))}
          </S.ProductList>
        ) : (
          <S.EmptyProductContainer>
            <img src={EmptyCart} alt="빈 상품 목록" />
            <p>표시할 상품이 없습니다.</p>
          </S.EmptyProductContainer>
        )}

        {isAddPageAble && <S.LoadingWrapper ref={targetRef}>{loading && <LoadingSpinner />}</S.LoadingWrapper>}
      </Layout.Content>

      <FloatingButton />
    </Layout>
  );
};

export default ProductListPage;
