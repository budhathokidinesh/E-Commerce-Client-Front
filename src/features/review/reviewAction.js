import { getAllReviewApi } from "./reviewApi";
import { setReviewes } from "./reviewSlice";

const reviewAction = (productId) => async (dispatch) => {
  console.log(productId);
  const result = await getAllReviewApi(productId);
  return dispatch(setReviewes(result.payload));
};

export default reviewAction;
