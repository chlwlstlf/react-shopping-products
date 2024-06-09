import { Button } from '../common';
import QuantityContainer from './QuantityContainer';
import useFetchCartItems from '../../hooks/useCartItems/useFetchCartItems';
import useMutateCartItems from '../../hooks/useCartItems/useMutateCartItems';
import { Product } from '../../types/Product.type';
import { formatCurrency } from '../../utils/formatCurrency';
import * as S from './ProductItem.style';

import AddCart from '../../assets/AddCart.svg';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { cartItems } = useFetchCartItems();
  const { handleAddCartItem, handleDeleteCartItem, handleCartItemQuantity } = useMutateCartItems();

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const isAdded = !!cartItem;

  const handleDecreaseQuantity = () => {
    if (!cartItem) return;
    if (cartItem.quantity === 1) {
      handleDeleteCartItem(cartItem.id);
    } else {
      handleCartItemQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (!cartItem) return;
    handleCartItemQuantity(cartItem.id, cartItem.quantity + 1);
  };

  return (
    <S.Layout>
      <S.ImageWrapper src={product.imageUrl} alt={product.name} />
      <S.Container>
        <S.TextContainer>
          <strong>{product.name}</strong>
          <span>{formatCurrency(product.price)}</span>
        </S.TextContainer>

        <S.CartButtonContainer>
          {isAdded ? (
            <QuantityContainer
              quantity={cartItem.quantity}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />
          ) : (
            <Button size="medium" onClick={() => handleAddCartItem(product.id)}>
              <S.AddCartIcon src={AddCart} alt="장바구니 담기" />
              <p>담기</p>
            </Button>
          )}
        </S.CartButtonContainer>
      </S.Container>
    </S.Layout>
  );
};

export default ProductItem;
