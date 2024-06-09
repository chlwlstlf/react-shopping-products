import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem, deleteCartItem, updateCartItemQuantity } from '../../api/cart';
import { QUERY_KEYS } from '../../api/queryKeys';
import { ToastContext } from '../../context/ToastProvider';

interface UseMutateCartItemsResult {
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
  handleCartItemQuantity: (productId: number, quantity: number) => void;
}

const useMutateCartItems = (): UseMutateCartItemsResult => {
  const queryClient = useQueryClient();
  const { showToast } = useContext(ToastContext);

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
  };

  const onError = (error: Error) => {
    showToast(error.message);
  };

  const addMutation = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess,
    onError: (error) => onError(error),
    networkMode: 'always',
  });

  const deleteMutation = useMutation({
    mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),
    onSuccess,
    onError: (error) => onError(error),
    networkMode: 'always',
  });

  const updateMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      updateCartItemQuantity(cartItemId, quantity),
    onSuccess,
    onError: (error) => onError(error),
    networkMode: 'always',
  });

  const handleAddCartItem = (productId: number) => {
    addMutation.mutate(productId);
  };

  const handleDeleteCartItem = (cartItemId: number) => {
    deleteMutation.mutate(cartItemId);
  };

  const handleCartItemQuantity = (cartItemId: number, quantity: number) => {
    updateMutation.mutate({ cartItemId, quantity });
  };

  return {
    handleAddCartItem,
    handleDeleteCartItem,
    handleCartItemQuantity,
  };
};

export default useMutateCartItems;
