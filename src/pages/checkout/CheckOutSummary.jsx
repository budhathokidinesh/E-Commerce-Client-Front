import React from "react";
import { useSelector } from "react-redux";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CheckOutSummary = () => {
  const {
    cartItems,
    isPromoApplied,
    subtotal,
    discount,
    shipping,
    total,
    promoCode,
  } = useSelector((state) => state.cartInfo);

  return (
    <>
      <Card className="border-0 shadow-sm mb-6">
        <CardContent className="p-4">
          {/* Pricing Summary */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-gray-900">Subtotal</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            {isPromoApplied && (
              <div className="flex justify-between items-center">
                <span className="text-gray-900">Discount {promoCode}</span>
                <span className="text-green-600">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-900">Delivery</span>
              <span className="text-gray-900">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between items-center font-medium">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="text-gray-500 text-sm mt-1">
                Inclusive of 10% GST
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Date */}
      <div className="text-sm text-gray-900 font-bold mb-4">
        {(() => {
          const fmt = (d) =>
            d.toLocaleDateString("en-AU", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });

          const start = new Date();
          start.setDate(start.getDate() + 5);

          const end = new Date();
          end.setDate(end.getDate() + 7);

          return `Arrives ${fmt(start)} - ${fmt(end)}`;
        })()}
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div key={item.id || item._id}>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                <img
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.product_title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 mb-1">
                  $
                  {((item.discountPrice || item.price) * item.quantity).toFixed(
                    2
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {item.product_title}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {item.mainCategory}
                </div>
                <div className="text-sm text-gray-600">Color: {item.color}</div>
                <div className="text-sm text-gray-600">
                  Qty: {item.quantity} | Size: {item.size}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CheckOutSummary;
