import { axiosApiCall } from "../../axios/axiosApiCall";

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

const productApiEndPoint = `${apiBaseUrl}/api/v1/product`;
export const getAllProductApi = () => {
  const obj = {
    url: productApiEndPoint,
    method: "get",
  };

  return axiosApiCall(obj);
};

// /filterProduct?categories=men&colors=White,Grey
export const getAllFilterProductApi = (query) => {
  const obj = {
    url: `${productApiEndPoint}/filterProduct${query}`,
    method: "get",
  };

  return axiosApiCall(obj);
};
export const getSingleProductApi = (slug) => {
  const obj = {
    url: `${productApiEndPoint}/bySlug/${slug}`,
    method: "get",
  };

  return axiosApiCall(obj);
};
