import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  ShoppingCart,
  Check,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAction } from "../../features/product/productAction";
import { addToLocalCart } from "../../utils/cartLocalStorage";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { slug } = useParams();

  const { products } = useSelector((state) => state.productInfo);
  const product = products.find((product) => product.slug === slug) || {};
  console.log("product", product);

  // fetch all products when component mounts
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProductAction());
    }
  }, [dispatch, products]);

  //function to handle add to cart
  const handleAddToCart = (product) => {
    try {
      const cartObj = {
        product_id: product?._id,
        product_title: product?.title,
        color: selectedColor,
        size: selectedSize,
        discountPrice: product?.discountPrice,
        price: product?.price,
        quantity: quantity,
        thumbnail: product?.thumbnail,
        mainCategory: product?.mainCategory,
      };
      const updatedCart = addToLocalCart(cartObj);
      toast.success(`${product.title} is added to cart`);
    } catch (error) {
      console.error("Error adding item to local cart:", error);
      return [];
    }
  };

  return (
    <div className="min-h-screen  mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Thumbnail Images - Left Side */}
            <div className="flex flex-col gap-3">
              {product.images?.map((image, index) => (
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
                    alt={`${product.title} view ${index + 1}`}
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
                    product.images?.[selectedImage] ||
                    "/placeholder.svg?height=600&width=600"
                  }
                  alt={product.title}
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
                {product.brand}
              </Badge>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-gray-300 text-gray-300"
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  No reviews yet
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
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

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Color: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex gap-2">
                {product?.colors?.map((color) => (
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
                {product?.sizes?.map((size) => (
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
                      setQuantity(Math.min(product.stock, quantity + 1))
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
                  !selectedSize || !selectedColor || product.stock === 0
                }
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className=" w-full rounded-full bg-transparent hover:bg-gray-200"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                />
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
