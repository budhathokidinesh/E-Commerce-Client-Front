import { axiosApiCall } from "../../axios/axiosApiCall";

const API_BASE_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/coupons`;

// check coupon code
export const checkCoupon = (promoCode) => {
  return axiosApiCall({
    method: "post",
    url: `${API_BASE_URL}/checkCoupon`,
    data: promoCode,
  });
};
