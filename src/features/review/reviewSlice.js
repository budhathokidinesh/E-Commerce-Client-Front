import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReviewes: (state, { payload }) => {
     
      state.reviews = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer, actions } = reviewSlice;
export const { setReviewes } = actions;

export default reducer;
