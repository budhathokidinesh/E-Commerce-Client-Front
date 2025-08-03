import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtered: {
    mainCategory: [],
    maxPrice: "",
    minPrice: "",
    colors: [],
    sale: "",
    brand: [],
    productPath: "",
  },
};

export const filtersSlice = createSlice({
  name: "filtered",
  initialState,
  reducers: {
    setFiltered: (state, { payload }) => {
      state.filtered = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer, actions } = filtersSlice;
export const { setFiltered } = actions;

export default reducer;
