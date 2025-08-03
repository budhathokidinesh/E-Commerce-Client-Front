import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  order: null,
  loading: false,
  error: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrderLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOrderError: (state, action) => {
      state.error = action.payload;
    },
    resetOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setOrder, setOrderLoading, setOrderError, resetOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
