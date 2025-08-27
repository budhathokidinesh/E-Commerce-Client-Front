import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

const initialState = {
  products: [],
  FilterProduct: [],
  singleProduct: {},
  recomedateProducts: [],
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
    setRecomendedProducts: (state, { payload }) => {
      state.recomedateProducts = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer, actions } = productsSlice;
export const {
  setProducts,
  setFilteredProduct,
  setSingleProduct,
  setRecomendedProducts,
} = actions;

export default reducer;
