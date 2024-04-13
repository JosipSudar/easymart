import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    increaseQuantity: (state, action) => {
      const product = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (product) {
        product.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (product) {
        product.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
