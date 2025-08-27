
import { axiosApiCall } from "../../axios/axiosApiCall.js";

const Recomnedation_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/recomendation`;

export const postUserIntersction = (obj) => {
  return axiosApiCall({
    method: "post",
    url: Recomnedation_URL,
    data: obj,
  });
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
