import { axiosApiCall } from "../../axios/axiosApiCall";
const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

const orderApiEndPoint = `${apiBaseUrl}/api/v1/order/placeOrder`;
export const placeOrderApi = () => {
  const obj = {
    url: orderApiEndPoint,
    method: "post",
  };
  return axiosApiCall(obj);
};
