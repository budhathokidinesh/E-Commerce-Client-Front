import {
  getAllFilterProductApi,
  getAllProductApi,
  getRecomendedProducts,
  getSingleProductApi,
} from "./productApi";
import {
  setFilteredProduct,
  setProducts,
  setRecomendedProducts,
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
export const recomendedProductAction = (userId) => async (dispatch) => {
  console.log(userId);
  const productInfo = await getRecomendedProducts(userId);
  const { status, payload } = productInfo;

  status === "success" && dispatch(setRecomendedProducts(payload));
};
