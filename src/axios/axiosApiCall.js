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
  } = axiosParams;

  // Determine the token based on whether to use refresh token or access token
  const token = useRefreshToken
    ? localStorage.getItem("refreshJWT")
    : sessionStorage.getItem("accessJWT");

  // Set headers based on whether the request is private or not
  const headers = { Authorization: isPrivate ? `bearer ${token}` : null };

  try {
    // Make the API call using axios
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    // if (response.data.status === "error") {
    //   throw { message: response.data.message || "An error occurred" };
    // }
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    toast.error(message);

    return {
      status: error?.response?.status || "error",
      message,
    };
  }
};
