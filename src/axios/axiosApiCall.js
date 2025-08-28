import axios from "axios";

// import { getNewAccessJwt } from "./userAxios";
import { toast } from "react-toastify";

export const axiosApiCall = async (axiosParams) => {
  // Destructure the parameters from axiosParams
  const {
    method,
    url,
    data,
    isPrivate = false,
    useRefreshToken = false,
    params,
    // autoStoreToken = false,
  } = axiosParams;
  console.log(params);
  // Determine the token based on whether to use refresh token or access token
  const token = useRefreshToken
    ? localStorage.getItem("refreshJWT")
    : sessionStorage.getItem("accessJWT");

  // Set headers based on whether the request is private or not

  const headers = {};

  if (isPrivate && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Make the API call using axios
    const response = await axios({
      method,
      url,
      data,
      headers,
      params,
    });
    // if (autoStoreToken && response?.data?.token) {
    //   sessionStorage.setItem("accessJWT", response.data.token);
    // }
    return response.data;
  } catch (error) {
    // handle error
    // If access token is expired, try to get new access token using the refresh token
    // and use that new access token to make api call

    console.error(error);
    throw error;
  }
};
