import {
  addAddressApi,
  changePasswordApi,
  deleteAddressApi,
  deleteUserApi,
  editAddressApi,
  getUser,
  getWishlistProductsApi,
  logoutUser,
  toggleWishlistApi,
  updateUser,
} from "./userApi";
import { toast } from "react-toastify";

import {
  getWishlistDetails,
  setUser,
  setWishlist,
  resetUser,
  // toggleWishlist,
} from "./userSlice";
// import { useSelector } from "react-redux";

import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

//Redux Thunk
// GET USER ACTION
export const getUserAction = () => async (dispatch) => {
  const response = await getUser();

  if (response?.status == "error") {
    return toast.error(response.message || "Something went wrong!");
  }
  // If the response is successful, dispatch the setUser action with the user data
  console.log("User payload from API:", response.payload);
  dispatch(setUser(response.payload));

  return response;
};

//Auto login action
export const autoLoginAction = () => async (dispatch) => {
  try {
    let accessJWT = sessionStorage.getItem("accessJWT");
    const refreshJWT = localStorage.getItem("refreshJWT");

    // If no tokens → stop
    if (!accessJWT && !refreshJWT) {
      console.log("No tokens, cannot auto-login");
      return;
    }

    // Try fetching user with current accessJWT
    if (accessJWT) {
      try {
        const { data } = await axios.get(
          `${apiBaseUrl}/api/v1/auth/user-info`,
          {
            headers: {
              Authorization: `Bearer ${accessJWT}`,
            },
          }
        );

        dispatch(setUser(data.payload));
        console.log("Auto-login success with accessJWT");
        return;
      } catch (err) {
        console.log("AccessJWT invalid or expired, will try refresh");
      }
    }

    //If accessJWT failed, try using refreshJWT to get a new accessJWT
    if (refreshJWT) {
      try {
        const { data } = await axios.get(`${apiBaseUrl}/api/v1/auth/renew`, {
          headers: {
            Authorization: `Bearer ${refreshJWT}`,
          },
        });

        if (data?.payload) {
          // Store new access token
          accessJWT = data.payload;
          sessionStorage.setItem("accessJWT", accessJWT);

          // Fetch user again with new token
          const { data: userRes } = await axios.get(
            `${apiBaseUrl}/api/v1/auth/user-info`,
            {
              headers: {
                Authorization: `Bearer ${accessJWT}`,
              },
            }
          );

          dispatch(setUser(userRes.payload));
          console.log("Auto-login success after refresh");
        }
      } catch (err) {
        console.error("RefreshJWT invalid, clearing tokens");
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("refreshJWT");
        toast.error("Session expired. Please login again.");
      }
    }
  } catch (error) {
    console.error("Auto login error:", error);
  }
};

// LOGOUT USER
export const logoutUserAction = (email) => async (dispatch) => {
  try {
    // call api to delete session and update user's refesh token
    const response = await logoutUser(email);
    console.log("logout response", response);

    if (response?.status === "success") {
      // remove tokens from storage
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");

      // clear state
      dispatch(setUser({}));
      toast.success(response.message);
      return response;
    }
    toast.error(response.message);
    return response;
  } catch (error) {
    toast.error(error.message || "Logout failed");
    throw error;
  }
};

export const toggleWishlistAction = (productId) => async (dispatch) => {
  try {
    const { status, payload, message } = await toggleWishlistApi(productId);

    console.log(status, payload, message);
    if (status === "success") {
      const wishlist = Array.isArray(payload) ? payload : [];
      dispatch(setWishlist(wishlist));
      toast.success("Wishlist updated");
    }
  } catch (error) {
    toast.error("Failed to update wishlist");
    console.log(error);
  }
};

export const fetchWishlistAction = () => async (dispatch) => {
  try {
    const response = await getWishlistProductsApi();
    const status = response.status;
    const payload = response.payload;

    if (status === "success") {
      dispatch(getWishlistDetails(payload));
    }
  } catch (error) {
    console.log("Error fetching wishlist:", error);
    toast.error("Failed to fetch wishlist");
  }
};

export const updateUserAction = (userData) => async (dispatch) => {
  try {
    const response = await updateUser(userData);

    if (response?.status === "success") {
      toast.success("Profile Updated..!");

      // Update Redux state immediately with the data we know
      dispatch(setUser(response.payload));

      // Then fetch fresh data from server to ensure consistency
      dispatch(getUserAction());

      return response;
    } else {
      toast.error(response?.message || "Update failed ..!");
      return response;
    }
  } catch (error) {
    console.error("Update user error:", error);
    toast.error("Failed to update profile");
    return { status: "error", message: error.message };
  }
};

export const changePasswordAction = (formData) => async () => {
  try {
    const response = await changePasswordApi(formData);
    if (response?.status === "error") {
      toast.error(response.message || "Password update failed");
      return response;
    }
    toast.success("Password updated successfully");
    return response;
  } catch (error) {
    toast.error("Something went wrong! Couldn't update password");
    console.log(error);
    return { status: "error" };
  }
};

export const deleteUserAction = () => async (dispatch) => {
  const response = await deleteUserApi();
  if (response?.status === "success") {
    toast.success("Your account has been deleted successfully!");
    dispatch(resetUser()); //Clear redux user
  } else {
    toast.error(response.message || "Failed to delete account");
  }
  return response;
};

export const addAddressAction = (formData) => async (dispatch) => {
  const res = addAddressApi(formData);
  if (res.status === "error") {
    toast.error(res.message || "Failed to add address");
    return res;
  }
  toast.success("Address added successfully");
  dispatch(setUser(res.payload)); // Update user in redux
};
export const editAddressAction = (formData) => async (dispatch) => {
  const res = editAddressApi(formData);
  if (res.status === "error") {
    toast.error(res.message || "Failed to edit address");
    return res;
  }
  toast.success("Address edited successfully");
  dispatch(setUser(res.payload)); // Update user in redux
};
export const deleteAddressAction = (addressId) => async (dispatch) => {
  const res = deleteAddressApi(addressId);
  if (res.status === "error") {
    toast.error(res.message || "Failed to delete address");
    return res;
  }
  toast.success("Address deleted successfully");
  dispatch(setUser(res.payload)); // Update user in redux
};
