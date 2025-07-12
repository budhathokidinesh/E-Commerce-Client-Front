import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCarts: (state, action) => {
      state.cartItems = action.payload;
    },
    removeCartItem: (state, action) => {
      const cartIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== cartIdToRemove
      );
    },
  },
});

export const { reducer: cartReducer, actions } = cartSlice;
export const { setCarts, removeCartItem } = actions;

export default cartReducer;
