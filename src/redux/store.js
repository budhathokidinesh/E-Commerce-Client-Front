import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import categoiresReducer from "../features/categories/categoriesSlice";
import { cartReducer } from "../features/cart/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  productInfo: productReducer,
  categoriesInfo: categoiresReducer,
  cartInfo: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
