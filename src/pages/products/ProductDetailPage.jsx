import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star, Plus, Minus, ShoppingCart, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { singleProductAction } from "../../features/product/productAction";
import { toast } from "react-toastify";
import { addItemToCart } from "../../features/cart/cartAction";
import { toggleWishlistAction } from "../../features/user/userAction";
import ReviewPage from "../review/ReviewPage";
import reviewAction from "../../features/review/reviewAction";
import userInteractionObj from "../../utils/interactionId.js";
import { postUserIntersction } from "../../features/userInteractions/userInteractionApi.js";
import RecomendedProduct from "./RecomendedProduct.jsx";
import { Separator } from "@/components/ui/separator";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const wishlist = useSelector((state) => state.user.wishlistProducts);

  const { slug } = useParams();
  console.log(slug);

  const { products } = useSelector((state) => state.productInfo);
  const navigate = useNavigate();
  const product = products.find((product) => product.slug === slug) || {};
  const { user } = useSelector((state) => state.user);
  const isLoggedIn = !!user && !!user._id;
  const isWishlisted = user?.wishList?.includes(product._id);

  const { singleProduct } = useSelector((state) => state.productInfo);

  useEffect(() => {
    dispatch(singleProductAction(slug));

    if (singleProduct?._id) {
      dispatch(reviewAction(singleProduct._id));
    }
  }, [dispatch, slug, user]);

  //function to handle add to cart
  const handleAddToCart = (product) => {
    try {
      const recomedationObj = userInteractionObj({
        productId: product._id,
        userId: user._id,
        type: "cart",
      });

      postUserIntersction(recomedationObj);
      dispatch(addItemToCart(product, selectedColor, selectedSize, quantity));
      toast.success(`${product.title} is added to cart`);
    } catch (error) {
      console.error("Error adding item to local cart:", error);
      return [];
    }
  };

  //Function to handle WishList
  const handleToggleWishlist = () => {
    if (!isLoggedIn) {
      toast.error("You must be Logged In to add products to wishlist");
      navigate("/login");
      return;
    }
    dispatch(toggleWishlistAction(product._id, product.title));
    if (!isWishlisted) {
      toast.success(`"${product.title} added to your wishlist`);
      return;
    } else toast.success(`"${product.title} removed from your wishlist`);
  };

  return (
    <div className="min-h-screen  mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Thumbnail Images - Left Side */}
            <div className="flex flex-col gap-3">
              {singleProduct?.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg?height=80&width=80"}
                    alt={`${singleProduct.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image - Right Side */}
            <div className="flex-1">
              <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={
                    singleProduct?.images?.[selectedImage] ||
                    "/placeholder.svg?height=600&width=600"
                  }
                  alt={singleProduct?.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="ghost"
                className="text-xs font-medium bg-yellow-500"
              >
                {singleProduct.brand}
              </Badge>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {singleProduct.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                $
                {singleProduct.discountPrice > 0
                  ? singleProduct.discountPrice
                  : singleProduct.price}
              </span>
              {singleProduct.price !== singleProduct.discountPrice &&
                singleProduct.discountPrice > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ${singleProduct.price}
                  </span>
                )}
              {singleProduct.stock === 0 ? (
                <Badge
                  variant="outline"
                  className="text-xs text-red-600 border-red-200"
                >
                  Out of stock
                </Badge>
              ) : singleProduct.stock <= 10 ? (
                <Badge
                  variant="outline"
                  className="text-xs text-orange-600 border-orange-200"
                >
                  Only {singleProduct.stock} left
                </Badge>
              ) : null}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {singleProduct.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Color: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex gap-2">
                {singleProduct?.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "white"
                          ? "#ffffff"
                          : color.toLowerCase() === "black"
                            ? "#000000"
                            : color.toLowerCase() === "red"
                              ? "#dc2626"
                              : color.toLowerCase(),
                    }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <Check className="w-4 h-4 text-white mx-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {singleProduct?.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-2 text-sm font-medium rounded-lg border transition-all ${
                      selectedSize === size
                        ? "border-black border-2 "
                        : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(singleProduct.stock, quantity + 1))
                    }
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={
                  !selectedSize || !selectedColor || singleProduct.stock === 0
                }
                onClick={() => handleAddToCart(singleProduct)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {singleProduct.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className=" w-full rounded-full bg-transparent hover:bg-gray-200"
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${wishlist.includes(product._id) ? "fill-red-500 text-red-500" : ""}`}
                />
                Wishlist
              </Button>

              <ReviewPage></ReviewPage>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="px-4 py-4">
        <RecomendedProduct></RecomendedProduct>
      </div>
    </div>
  );
};

export default ProductDetailPage;
