import TitleContainer from '../../components/TitleContainer/TitleContainer';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import ProductItem from '../../components/ProductItem/ProductItem';

import useProducts from '../../hooks/useProducts/useProducts';
import useCartItems from '../../hooks/useCartItems/useCartItems';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useFilterAndSort from '../../hooks/useFilterAndSort';

import { CATEGORY_LIST, SORTING_LIST } from '../../constants/optionList';
import { SIZE } from '../../constants/api';
import * as S from './ProductListPage.style';

import CartIcon from '../../assets/CartIcon.svg';
import EmptyCart from '../../assets/EmptyCart.png';
import Loading from '../../assets/loading.gif';

const ProductListPage = () => {
  const { category, sort, handleCategory, handleSort } = useFilterAndSort();
  const { products, loading, error, isLast, handlePage } = useProducts(category, sort);
  const { cartItems, handleAddCartItem, handleDeleteCartItem } = useCartItems();
  const targetRef = useIntersectionObserver(handlePage);

  const isAddPageAble = !error && !isLast;

  return (
    <>
      <Header>
        <S.CartIconWrapper>
          <img src={CartIcon} alt="장바구니 아이콘" />
          <S.CartNumber>{cartItems.length <= SIZE.DEFAULT ? cartItems.length : `${SIZE.DEFAULT}+`}</S.CartNumber>
        </S.CartIconWrapper>
      </Header>
      <S.Layout>
        <TitleContainer title="텐파의 쇼핑몰" />

        <S.DropdownContainer>
          <Dropdown options={CATEGORY_LIST} selectedOption={category} updateOption={handleCategory} />
          <Dropdown options={SORTING_LIST} selectedOption={sort} updateOption={handleSort} />
        </S.DropdownContainer>

        {products.length > 0 ? (
          <S.ProductList>
            {products.map((product, index) => (
              <ProductItem
                key={`${product.id}-${index}`}
                product={product}
                isAdded={cartItems.some((item) => item.product.id === product.id)}
                onAddCartItem={handleAddCartItem}
                onDeleteCartItem={handleDeleteCartItem}
              />
            ))}
          </S.ProductList>
        ) : (
          <S.EmptyProductContainer>
            <img src={EmptyCart} alt="빈 상품 목록" />
            <p>표시할 상품이 없습니다.</p>
          </S.EmptyProductContainer>
        )}

        {isAddPageAble && (
          <S.LoadingWrapper ref={targetRef}>
            {loading && <S.LoadingSpinner src={Loading} alt="로딩 스피너" />}
          </S.LoadingWrapper>
        )}
      </S.Layout>
      <FloatingButton />
    </>
  );
};

export default ProductListPage;
