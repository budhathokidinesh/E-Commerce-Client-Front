import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import PaymentForm from "./PaymentForm";
import CheckOutSummary from "../checkout/CheckOutSummary";
import { getOrCreateGuestId } from "../../utils/guestId";
import { createPaymentAxios } from "../../features/cart/cartApi";
import { fetchCartFromStorage } from "../../features/cart/cartAction";

// Load Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useSelector((state) => state.user);
  const { total, cartItems } = useSelector((state) => state.cartInfo);
  const totalAmount = total;

  const orderedProduct = cartItems.map((item) => {
    return {
      productId: item.product_id,
      price: item.discountPrice > 0 ? item.discountPrice : item.price,
      quantity: item.quantity,
    };
  });

  const guestId = getOrCreateGuestId();
  const guestInfo = localStorage.getItem(`guestAddress_${guestId}`);
  const loggedInUserInfo =
    user && user._id
      ? localStorage.getItem(`checkoutAddress_${user._id}`)
      : null;

  const orderInfo = loggedInUserInfo || guestInfo;

  useEffect(() => {
    dispatch(fetchCartFromStorage());
  }, [dispatch]);

  useEffect(() => {
    // Only fetch client secret if cart is loaded and total is valid
    if (cartItems.length === 0 || totalAmount <= 0) return;

    const fetchClientSecret = async () => {
      try {
        const orderPayload = { totalAmount, orderedProduct, orderInfo };
        // make payment api call
        const response = await createPaymentAxios(orderPayload);
        const clientSecretKey = response?.payload?.clientSecret;

        if (clientSecretKey) {
          setClientSecret(clientSecretKey);
        } else {
          console.error("Missing clientSecret from response:", response);
        }
      } catch (err) {
        console.error("Error creating payment intent:", err);
      }
    };

    fetchClientSecret();
  }, [totalAmount, cartItems, orderInfo]);

  const options = {
    // passing the client secret obtained from the server | server send this in response from stripe
    clientSecret: clientSecret,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <div className="flex flex-col pt-8 md:pt-0 min-h-[400px]">
              {!clientSecret ? (
                <p>Loading payment...</p>
              ) : (
                <Elements stripe={stripePromise} options={options}>
                  <PaymentForm totalAmount={totalAmount} />
                </Elements>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">In Your Bag</h2>
            </div>
            <CheckOutSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
