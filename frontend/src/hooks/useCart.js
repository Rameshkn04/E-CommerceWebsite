import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { addItem, updateQuantity, removeItem, clearCart } from '../store/cartSlice.js';
import { selectCartItems } from '../store/store.js';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const totals = useMemo(() => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    return { totalItems, totalPrice };
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    dispatch(addItem({ product, quantity }));
  };

  const updateCartItem = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const removeFromCart = (productId) => {
    dispatch(removeItem({ productId }));
  };

  const resetCart = () => {
    dispatch(clearCart());
  };

  const isInCart = (productId) => items.some((item) => item.product._id === productId);

  return {
    items,
    ...totals,
    addToCart,
    updateCartItem,
    removeFromCart,
    resetCart,
    isInCart
  };
};

