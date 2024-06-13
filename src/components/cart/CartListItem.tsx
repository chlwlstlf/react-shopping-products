import { Button, Splitter } from '../common';
import QuantityContainer from '../product/QuantityContainer';
import useMutateCartItems from '../../hooks/useCartItems/useMutateCartItems';
import { CartItem } from '../../types/CartItem.type';
import { formatCurrency } from '../../utils/formatCurrency';
import * as S from './CartListItem.style';

interface CartItemProps {
  cartItem: CartItem;
}

const CartListItem = ({ cartItem }: CartItemProps) => {
  const { handleDeleteCartItem, handleCartItemQuantity } = useMutateCartItems();

  const handleDecreaseQuantity = () => {
    handleCartItemQuantity(cartItem.id, Math.max(cartItem.quantity - 1, 1));
  };

  const handleIncreaseQuantity = () => {
    handleCartItemQuantity(cartItem.id, cartItem.quantity + 1);
  };

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

          <QuantityContainer
            quantity={cartItem.quantity}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
          />
        </S.ProductDetails>
      </S.ProductInfo>
    </S.CartItemWrapper>
  );
};

export default CartListItem;
