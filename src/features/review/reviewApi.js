import { data } from "react-router-dom";
import { axiosApiCall } from "../../axios/axiosApiCall";

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

const reviewApiEndPoint = `${apiBaseUrl}/api/v1/reviews`;
export const getAllReviewApi = (_id) => {
  const obj = {
    url: `${reviewApiEndPoint}/getProductReview/${_id}`,
    method: "get",
  };

  return axiosApiCall(obj);
};

// /filterProduct?categories=men&colors=White,Grey
export const postReviewApi
 = (data) => {
  const obj = {
    url: `${reviewApiEndPoint}/postReview`,
    data,
    isPrivate: true,
    method: "post",
  };

  return axiosApiCall(obj);
};
