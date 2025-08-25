import { axiosApiCall } from "../../axios/axiosApiCall";

const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/auth`;

//CREATE USER | POST |  SIGNUP |  PUBLIC
export const createUser = (userObj) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/register`,
    data: userObj,
  });
};

// ACTIVATE USER | PATCH | PRIVATE
export const activateUser = (activationObj) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/activate-user`,
    data: activationObj,
  });
};

// LOGIN USER | POST | /login  | PUBLIC
export const loginUser = (loginData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/login`,
    data: loginData,
  });
};

// GET the user | GET | PRIVATE
export const getUser = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/user-info`,
    isPrivate: true,
  });
};

//CREATE USER | POST |  SIGNUP |  PUBLIC

//UPDATE USER ROLE  | FOR ADMIN

// UPDATE USER | PATCH | PRIVATE
export const updateUser = (userData) => {
  return axiosApiCall({
    method: "put",
    url: `${USER_API_URL}/user-info`,
    data: userData,
    isPrivate: true,
  });
};

//LOGOUT USER | POST | PRIVATE
export const logoutUser = (email) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/logout`,
    data: { email },
    isPrivate: true,
  });
};

//FORGET PASSWORD | /forget-password | POST | PUBLIC
export const forgetPasswordEmail = (formData) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/forgot-password`,
    data: formData,
  });
};

// CHANGE PASSWORD | /change-password | PATCH
export const resetPasswordApi = (data) => {
  return axiosApiCall({
    method: "patch",
    url: `${USER_API_URL}/reset-password`,
    data: data,
  });
};

export const toggleWishlistApi = (productId) => {
  console.log(productId);
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/wishlist`,
    data: { productId },
    isPrivate: true,
  });
};

export const getWishlistProductsApi = () => {
  return axiosApiCall({
    method: "get",
    url: `${USER_API_URL}/wishlist`,
    isPrivate: true,
  });
};
export const changePasswordApi = (data) => {
  return axiosApiCall({
    method: "put",
    url: `${USER_API_URL}/change-password`,
    data,
    isPrivate: true,
  });
};

export const deleteUserApi = async () => {
  return axiosApiCall({
    method: "delete",
    url: `${USER_API_URL}/user-info`,

    isPrivate: true,
  });
};

export const addAddressApi = (data) => {
  return axiosApiCall({
    method: "post",
    url: `${USER_API_URL}/user-info/address`,
    data,
    isPrivate: true,
  });
};

export const editAddressApi = (data) => {
  return axiosApiCall({
    method: "put",
    url: `${USER_API_URL}/user-info/address`,
    data,
    isPrivate: true,
  });
};

export const deleteAddressApi = (addressId) => {
  return axiosApiCall({
    method: "delete",
    url: `${USER_API_URL}/user-info/address/${addressId}`,
    isPrivate: true,
  });
};
