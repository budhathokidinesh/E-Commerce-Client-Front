import { v4 as uuidv4 } from "uuid";
const userInteractionObj = ({ productId, userId, type }) => {
  if (!localStorage.getItem("interactionId")) {
    localStorage.setItem("interactionId", uuidv4());
  }

  return {
    userId,
    interactionId: localStorage.getItem("interactionId"),
    productId,
    type,
  };
};

export default userInteractionObj;
