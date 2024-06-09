import useFetchCartItems from '../../hooks/useCartItems/useFetchCartItems';
import { SIZE } from '../../constants/api';
import * as S from './ProductHeader.style';
import CartIcon from '../../assets/CartIcon.svg';

const ProductHeader = ({ onOpen }: { onOpen: () => void }) => {
  const { cartItems } = useFetchCartItems();

  return (
    <>
      <p>SHOP</p>
      <S.CartIconWrapper onClick={onOpen}>
        <img src={CartIcon} alt="장바구니 아이콘" />
        {cartItems.length > 0 && (
          <S.CartNumber>{cartItems.length <= SIZE.DEFAULT ? cartItems.length : `${SIZE.DEFAULT}+`}</S.CartNumber>
        )}
      </S.CartIconWrapper>
    </>
  );
};

export default ProductHeader;
