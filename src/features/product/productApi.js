import { axiosApiCall } from "../../axios/axiosApiCall";

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const Recomnedation_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/recomendation`;

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

export const getRecomendedProducts = (user = null) => {
  return axiosApiCall({
    method: "get",
    url: Recomnedation_URL,
    params: {
      userId: user,
      interactionId: localStorage.getItem("interactionId"),
    },
  });
};
