import {
  getAllFilterProductApi,
  getAllProductApi,
  getSingleProductApi,
} from "./productApi";
import {
  setFilteredProduct,
  setProducts,
  setSingleProduct,
} from "./productSlice.js";

export const fetchProductAction = () => async (dispatch) => {
  const productInfo = await getAllProductApi();
  const { payload, status } = productInfo;
  status === "success" && dispatch(setProducts(payload));
};
export const fetchFilterProductAction = (query) => async (dispatch) => {
  const productInfo = await getAllFilterProductApi(query);

  const { payload, status } = productInfo;

  status === "success" && dispatch(setFilteredProduct(payload));
};
export const singleProductAction = (slug) => async (dispatch) => {
  console.log(slug);
  const productInfo = await getSingleProductApi(slug);

  const { payload, status } = productInfo;

  status === "success" && dispatch(setSingleProduct(payload));
};
