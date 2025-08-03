import { getAllCategories } from "./categoriesApi";
import { setCategoires } from "./categoriesSlice";
export const fetctCategoriesAction = () => async (disptach) => {
  const categoriesInfo = await getAllCategories();

  const { payload, status } = categoriesInfo;
  console.log(payload);
  status === "success" && disptach(setCategoires(payload));
};
