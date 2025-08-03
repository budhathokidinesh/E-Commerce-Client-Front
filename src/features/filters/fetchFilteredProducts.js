// src/features/filters/fetchFilteredProducts.js
import { getAllFilterProductApi } from "../product/productApi";
import { setFilteredProduct } from "../product/productSlice";

export const fetchFilteredProducts = (filters) => async (dispatch) => {
  try {
    const queryParams = new URLSearchParams();

    console.log("FILTERS SENT TO API:", filters);

    if (filters?.productPath)
      queryParams.append("productPath", filters.productPath);

    if (filters?.minPrice !== undefined && filters.minPrice !== "")
      queryParams.append("minPrice", filters.minPrice);

    if (filters?.maxPrice !== undefined && filters.maxPrice !== "")
      queryParams.append("maxPrice", filters.maxPrice);

    if (Array.isArray(filters?.colors) && filters.colors.length > 0)
      queryParams.append("colors", filters.colors.join(","));

    if (filters?.sale) queryParams.append("sale", true); // boolean flags can just be true

    if (Array.isArray(filters?.brand) && filters.brand.length > 0)
      queryParams.append("brand", filters.brand.join(","));

    const query = queryParams.toString();

    const response = await getAllFilterProductApi(query);

    dispatch(setFilteredProduct(response.payload || []));
  } catch (error) {
    console.error("Error fetching filtered products:", error.message);
    dispatch(setFilteredProduct([]));
  }
};
