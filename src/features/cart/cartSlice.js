import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isPromoApplied: false,
  promoCode: "",
  appliedCoupon: null,
  couponLoading: false,
  subtotal: 0,
  discount: 0,
  shipping: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cartInfo",
  initialState,

  reducers: {
    setCarts: (state, action) => {
      state.cartItems = action.payload;
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );
    },
    setPromoApplied: (state, action) => {
      state.isPromoApplied = action.payload.isPromoApplied;
      state.promoCode = action.payload.promoCode;
      state.appliedCoupon = action.payload.appliedCoupon || null;
    },

    setCouponLoading: (state, action) => {
      state.couponLoading = action.payload;
    },
    updatePricing: (state, action) => {
      const { subtotal, discount, shipping, total } = action.payload;
      state.subtotal = subtotal;
      state.discount = discount;
      state.shipping = shipping;
      state.total = total;
    },
  },
});

export const { reducer: cartReducer, actions } = cartSlice;
export const {
  setCarts,
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
  setPromoApplied,
  updatePricing,
  setCouponLoading,
} = actions;

export default cartReducer;
