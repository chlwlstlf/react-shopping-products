import { Button, Splitter } from '../common';
import useMutateCartItems from '../../hooks/useCartItems/useMutateCartItems';
import { CartItem } from '../../types/CartItem.type';
import { formatCurrency } from '../../utils/formatCurrency';
import MinusIcon from '../../assets/MinusIcon.svg';
import PlusIcon from '../../assets/PlusIcon.svg';
import * as S from './CartItem.style';

interface CartItemProps {
  cartItem: CartItem;
}

const CartItemInfo = ({ cartItem }: CartItemProps) => {
  const { handleDeleteCartItem, handleCartItemQuantity } = useMutateCartItems();

  return (
    <S.CartItemWrapper>
      <Splitter />

      <S.ProductInfo>
        <S.ProductImage src={cartItem.product.imageUrl} alt={cartItem.product.name} />
        <S.ProductDetails>
          <S.Header>
            <S.ProductName>{cartItem.product.name}</S.ProductName>
            <Button variant="secondary" size="medium" onClick={() => handleDeleteCartItem(cartItem.id)}>
              삭제
            </Button>
          </S.Header>

          <S.ProductPrice>{formatCurrency(cartItem.product.price)}</S.ProductPrice>

          <S.CartItemQuantityControls>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleCartItemQuantity(cartItem.id, Math.max(cartItem.quantity - 1, 1))}
            >
              <img src={MinusIcon} alt="장바구니 1개 제거" />
            </Button>
            <p>{cartItem.quantity}</p>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleCartItemQuantity(cartItem.id, cartItem.quantity + 1)}
            >
              <img src={PlusIcon} alt="장바구니 1개 추가" />
            </Button>
          </S.CartItemQuantityControls>
        </S.ProductDetails>
      </S.ProductInfo>
    </S.CartItemWrapper>
  );
};

export default CartItemInfo;
