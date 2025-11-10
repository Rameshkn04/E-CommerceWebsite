import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const findItemIndex = (items, productId) => items.findIndex((item) => item.product._id === productId);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const index = findItemIndex(state.items, product._id);

      if (index >= 0) {
        state.items[index].quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = findItemIndex(state.items, productId);
      if (index >= 0) {
        state.items[index].quantity = quantity;
      }
    },
    removeItem: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter((item) => item.product._id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

