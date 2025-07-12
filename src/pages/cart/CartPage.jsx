import { useState, useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  getCartFromLocalStorage,
  updateLocalCartItemQuantity,
  removeFromLocalCart,
} from "../../utils/cartLocalStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      const items = getCartFromLocalStorage();
      setCartItems(items);
    };

    loadCartItems();
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const updatedCart = updateLocalCartItemQuantity(itemId, newQuantity);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = (itemId) => {
    try {
      const updatedCart = removeFromLocalCart(itemId);
      setCartItems(updatedCart);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 150 ? 0 : 7.99;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center py-20">
            <ShoppingBag className="mx-auto h-20 w-20 text-gray-300 mb-6" />
            <h1 className="text-2xl font-medium text-black mb-3">
              Your Bag is empty
            </h1>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Once you add something to your bag - it will appear here. Ready to
              get started?
            </p>
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full"
              onClick={() => navigate("/allProducts")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-black mb-2">Bag</h1>
          <p className="text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {cartItems.map((item, index) => (
                <div key={item.id || item._id}>
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-36 h-36 bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.product_title}
                          width={144}
                          height={144}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-4">
                          <h3 className="text-base font-medium text-black leading-tight mb-1">
                            {item.product_title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-1">
                            {item.mainCategory}
                          </p>
                          <p className="text-gray-500 text-sm mb-3">
                            Color:{" "}
                            <span className="font-medium text-black">
                              {item.color}
                            </span>
                          </p>

                          {/* size */}
                          <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                              <span>Size</span>
                              <span className="font-medium text-black">
                                {item.size}
                              </span>
                            </div>

                            {/* quantity */}
                            <div className="flex items-center gap-2">
                              <span>Quantity</span>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id || item._id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className="h-6 w-6 p-0 hover:bg-gray-100"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-medium text-black w-6 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id || item._id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="h-6 w-6 p-0 hover:bg-gray-100"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* delete & wishlist button */}
                        <div className="text-right">
                          <div className="flex items-center gap-3 mb-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 hover:bg-gray-100"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 hover:bg-gray-100"
                              onClick={() => removeItem(item.id || item._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div>
                            {item.discountPrice &&
                            item.discountPrice < item.price ? (
                              <>
                                <p className="text-sm text-gray-400 line-through mb-1">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="font-medium text-black">
                                  $
                                  {(item.discountPrice * item.quantity).toFixed(
                                    2
                                  )}
                                </p>
                              </>
                            ) : (
                              <p className="font-medium text-black">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <Separator className="mt-8" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="bg-white border-0 lg:sticky lg:top-8">
              <h2 className="text-xl font-medium text-black mb-6">Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-black">${subtotal.toFixed(2)}</span>
                </div>

                {isPromoApplied && (
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Discount (NIKE10)</span>
                    <span className="text-green-600">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-base">
                  <span className="text-gray-600">
                    Estimated Delivery & Handling
                  </span>
                  <span className="text-black">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-base font-medium">
                  <span className="text-black">Total</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Free delivery</span> on orders
                    over $150.00
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Add ${(150 - subtotal).toFixed(2)} to qualify
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border-gray-200 focus:border-black"
                  />
                  <Button
                    variant="outline"
                    className="border-gray-200 hover:border-black bg-transparent"
                    onClick={() => {
                      if (promoCode.trim()) {
                        setIsPromoApplied(true);
                        toast.success("Promo code applied successfully!");
                      }
                    }}
                  >
                    Apply
                  </Button>
                </div>
                {isPromoApplied && (
                  <p className="text-sm text-green-600">
                    Promo code applied successfully!
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-full text-base font-medium"
                  size="lg"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
