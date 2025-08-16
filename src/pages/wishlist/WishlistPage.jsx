import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchWishlistAction,
  toggleWishlistAction,
} from "../../features/user/userAction";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button";

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isLoggedIn = !!user && !!user._id;
  //Get the whole products details from wishlist
  const wishlist = useSelector((state) => state.user.wishlistProductDetails);
  console.log("WISHLIST IN COMPONENT : ", wishlist);
  const [localWishlist, setLocalWishlist] = useState([]);
  // Fetch wishlist products on mount
  useEffect(() => {
    dispatch(fetchWishlistAction());
  }, [dispatch]);
  // Sync local state whenever Redux wishlist changes
  useEffect(() => {
    setLocalWishlist(wishlist || []);
  }, [wishlist]);
  const handleToggleWishlist = (productId) => {
    //To remove from the UI
    setLocalWishlist((prev) => prev.filter((p) => p._id !== productId));
    //To remove product from wishlist : From Backend
    dispatch(toggleWishlistAction(productId));
  };

  //Display the products in JSX, if the user is loggedin.
  if (isLoggedIn) {
    return (
      <div className=" p-3">
        <div className="p-4 border-1 border-gray-300 rounded-xl bg-white shadow-md ">
          <h1 className="text-2xl text-center font-bold mb-6">Your Wishlist</h1>

          {localWishlist?.length === 0 ? (
            <p className="text-center my-25 text-gray-500">
              No items in your wishlist.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {localWishlist?.map((product) => (
                <Card
                  key={product._id}
                  className="group cursor-pointer hover:shadow-xl transition duration-300"
                  onClick={() => navigate(`/product-detail/${product.slug}`)}
                >
                  <div className="relative aspect-square bg-muted rounded-t-md overflow-hidden">
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-3 right-3  w-8 h-8 p-0 bg-white/80 hover:bg-white cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product._id);
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${wishlist.some((p) => p._id === product._id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </Button>
                  </div>

                  <CardContent className="p-4 space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.brand || "Brand"}
                    </Badge>
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span>{product.rating?.toFixed(1)}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-foreground">
                        ${product.discountPrice || product.price}
                      </span>
                      {product.discountPrice &&
                        product.discountPrice < product.price && (
                          <span className="text-sm line-through text-gray-500">
                            ${product.price}
                          </span>
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    toast.error("Please login to add products in wishlist");
    navigate("/login");
  }
};

export default WishlistPage;
