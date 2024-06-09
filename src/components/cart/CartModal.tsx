import { Modal } from 'chlwlstlf-modal';
import CartItem from './CartItem';
import { Button, Splitter } from '../common';
import useFetchCartItems from '../../hooks/useCartItems/useFetchCartItems';
import { formatCurrency } from '../../utils/formatCurrency';
import { Z_INDEX } from '../../constants/zIndex';
import EmptyCart from '../../assets/EmptyCart.png';
import * as S from './CartModal.style';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cartItems } = useFetchCartItems();

  const totalAmount = cartItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);

  return (
    <S.StyledModal isOpen={isOpen} onClose={onClose} position="bottom" zIndex={Z_INDEX.MODAL}>
      <Modal.Header>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>

      <Modal.Content>
        {cartItems.length > 0 ? (
          <S.CartItemContainer>
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </S.CartItemContainer>
        ) : (
          <S.EmptyProductContainer>
            <img src={EmptyCart} alt="빈 상품 목록" />
            <p>장바구니가 비어있습니다.</p>
          </S.EmptyProductContainer>
        )}

        <S.TotalAmountContainer>
          <Splitter />
          <S.TotalAmountWrapper>
            <p>총 결제금액</p>
            <strong>{formatCurrency(totalAmount)}</strong>
          </S.TotalAmountWrapper>
        </S.TotalAmountContainer>
      </Modal.Content>

      <Modal.Footer>
        <Button onClick={onClose}>닫기</Button>
      </Modal.Footer>
    </S.StyledModal>
  );
};

export default CartModal;
