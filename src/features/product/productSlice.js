import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  FilterProduct: [],
  singleProduct: {},
};

export const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    setFilteredProduct: (state, { payload }) => {
      console.log(payload);
      state.FilterProduct = payload;
    },
    setSingleProduct: (state, { payload }) => {
      state.singleProduct = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer, actions } = productsSlice;
export const { setProducts, setFilteredProduct, setSingleProduct } = actions;

export default reducer;
