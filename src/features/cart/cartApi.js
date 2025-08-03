import { axiosApiCall } from "../../axios/axiosApiCall";

const API_BASE_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/payment`;

// create a payment request
export const createPaymentAxios = (orderPayload) => {
  return axiosApiCall({
    method: "post",
    url: `${API_BASE_URL}/create-payment-intent`,
    data: orderPayload,
  });
};
