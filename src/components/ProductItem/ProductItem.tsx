import { Product } from '../../types/Product.type';
import AddCart from '../../assets/AddCart.svg';
import RemoveCart from '../../assets/RemoveCart.svg';
import Button from '../Button/Button';
import * as S from './ProductItem.style';

interface ProductItemProps {
  product: Product;
  isAdded: boolean;
  onAddCartItem: (productId: number) => void;
  onDeleteCartItem: (productId: number) => void;
}

const ProductItem = ({ product, isAdded, onAddCartItem, onDeleteCartItem }: ProductItemProps) => {
  const { id, name, price, imageUrl } = product;

  return (
    <S.Layout>
      <S.ImageWrapper src={imageUrl} alt={name} />
      <S.Container>
        <S.TextContainer>
          <strong>{name}</strong>
          <p>상품 설명</p>
          <p>{price}원</p>
        </S.TextContainer>
        <S.CartButtonContainer>
          {isAdded ? (
            <Button variant="secondary" onClick={() => onDeleteCartItem(id)}>
              <S.Icon src={RemoveCart} alt="장바구니 빼기" />
              <p>빼기</p>
            </Button>
          ) : (
            <Button onClick={() => onAddCartItem(id)}>
              <S.Icon src={AddCart} alt="장바구니 담기" />
              <p>담기</p>
            </Button>
          )}
        </S.CartButtonContainer>
      </S.Container>
    </S.Layout>
  );
};

export default ProductItem;
