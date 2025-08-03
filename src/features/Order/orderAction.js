import { placeOrderApi } from "./orderApi";
import { setOrderError, setOrderLoading } from "./orderSlice";

export const placeOrderAction = (orderData) => async (dispatch) => {
  try {
    dispatch(setOrderLoading(true));
    const response = await placeOrderApi(orderData);
    if (response?.success) {
      return response; //Used to redirect to stripe URL
    } else {
      dispatch(setOrderError(response.message));
    }
  } catch (error) {
    dispatch(setOrderError(error.message));
  } finally {
    dispatch(setOrderLoading(false));
  }
};
