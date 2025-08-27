import { useDispatch, useSelector } from "react-redux";
import reviewStar from "../../utils/reviewStar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { recomendedProductAction } from "../../features/product/productAction";
import { postUserIntersction } from "../../features/userInteractions/userInteractionApi";
import { toggleWishlistAction } from "../../features/user/userAction";
import { toast } from "react-toastify";

const RecomendedProduct = () => {
  const { recomedateProducts } = useSelector((state) => state.productInfo);
  const wishlist = useSelector((state) => state.user.wishlistProducts);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isLoggedIn = !!user && !!user._id;
  console.log(recomedateProducts);

  useEffect(() => {
    console.log("run ussseffect in recomedded product");
    // Step 1: fetch on page load
    dispatch(recomendedProductAction(user?._id));
  }, []);
  const handleToggleWishlist = (productId) => {
    if (!isLoggedIn) {
      toast.error("You must be Logged In to use the wishlist");
      return;
    }
    dispatch(toggleWishlistAction(productId));
  };
  const navigate = useNavigate();
  return (
    recomedateProducts.length > 0 && (
      <div>
        <div className="text-3xl text-black mb-4 text-center font-bold">
          You might also like
        </div>
        <div>
          <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
            {recomedateProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recomedateProducts?.map((product) => {
                  // const discountPercentage = calculateDiscountPercentage(
                  //   product.price,
                  //   product.discountPrice
                  // );

                  const { fullstarrating, halfstar, emptystars } = reviewStar(
                    product.reviews
                  );

                  console.log(fullstarrating, halfstar, emptystars);
                  // const isWishlisted = isProductWishlisted(productList._id);

                  return (
                    <Card
                      key={product._id}
                      className="group hover:shadow-lg transition-all duration-300 bg-white m-0 p-0"
                      onClick={() => {
                        const recomedationObj = {
                          productId: product._id,
                          userId: user?._id,
                          type: "view",
                        };

                        postUserIntersction(recomedationObj);
                        // window.location.reload();
                        ``;
                        navigate(`/product-detail/${product.slug}`);
                        // post recomendation
                      }}
                    >
                      <CardContent className="p-0 m-0">
                        {/* Product Image */}
                        <div
                          className="relative aspect-square bg-gray-100 overflow-hidden rounded-t-lg"
                          style={{ margin: 0, padding: 0, lineHeight: 0 }}
                        >
                          <img
                            src={product.thumbnail || "/placeholder.svg"}
                            alt={product.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* {discountPercentage > 0 &&
                          product.discountPrice > 0 && (
                            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                              -{discountPercentage}%
                            </Badge>
                          )} */}
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-3 right-3  w-8 h-8 p-0 bg-white/80 hover:bg-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist(product._id);
                            }}
                          >
                            <Heart
                              className={`w-4 h-4 ${wishlist.includes(product._id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                            />
                          </Button>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <div className="mb-2">
                            <Badge variant="secondary" className="text-xs mb-2">
                              {product.brand}
                            </Badge>
                            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                              {product.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {product.description}
                            </p>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex ">
                              {/* Full stars */}

                              {Array.from({ length: fullstarrating }).map(
                                (_, index) => (
                                  <FaStar
                                    key={`full-${index}`}
                                    className="text-yellow-500"
                                  />
                                )
                              )}
                              {/* Half star */}

                              <FaRegStarHalfStroke
                                key="half"
                                className={`text-yellow-500 ${!halfstar ? "hidden" : ""} `}
                              />
                              {/* Empty stars */}
                              {Array.from({ length: emptystars }).map(
                                (_, index) => (
                                  <FaRegStar key={`empty-${index}`} />
                                )
                              )}
                            </div>

                            <span className="text-sm text-gray-600">
                              {product.rating}
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">
                                $
                                {product.discountPrice > 0
                                  ? product.discountPrice
                                  : product.price}
                              </span>
                              {product.price !== product.discountPrice &&
                                product.discountPrice > 0 && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ${product.price}
                                  </span>
                                )}
                            </div>
                            {product.stock === 0 ? (
                              <Badge
                                variant="outline"
                                className="text-xs text-red-600 border-red-200"
                              >
                                Out of stock
                              </Badge>
                            ) : product.stock <= 10 ? (
                              <Badge
                                variant="outline"
                                className="text-xs text-orange-600 border-orange-200"
                              >
                                Only {product.stock} left
                              </Badge>
                            ) : null}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center font-semibold text-2xl text-gray-600 py-10">
                <div></div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default RecomendedProduct;
