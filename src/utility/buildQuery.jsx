import qs from "qs";

export const buildQuery = ({
  mainCategory,
  maxPrice,
  minPrice,
  sale,
  colors,
  brand,
  productPath,
}) => {
  let queries = qs.stringify({
    mainCategory,
    maxPrice,
    minPrice,
    sale,
    colors,
    brand,
    productPath,
  });

  return queries;
};
