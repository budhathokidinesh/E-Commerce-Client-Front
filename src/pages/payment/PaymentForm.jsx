import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { getOrCreateGuestId } from "../../utils/guestId";
import useLoading from "../../hooks/useLoading";

const PaymentForm = ({ totalAmount }) => {
  const { isLoading, startLoading, stopLoading } = useLoading(); //custom hook
  const [billingAddress, setBillingAddress] = useState(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Fetch billing address on mount
  useEffect(() => {
    let address = null;
    if (user && user._id) {
      const stored = localStorage.getItem(`checkoutAddress_${user._id}`);
      if (stored) address = JSON.parse(stored);
    } else {
      const guestId = getOrCreateGuestId();
      const stored = localStorage.getItem(`guestAddress_${guestId}`);
      if (stored) address = JSON.parse(stored);
    }
    setBillingAddress(address);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    startLoading();

    //making a secure API call to Stripe SDK via Stripe.js.
    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/order-success",
      },
      redirect: "if_required", // it will handle success manually unless redirect is required
    });

    if (response?.error) {
      navigate("/cancel");
      console.error("Payment error:", response.error.message);
    } else if (response?.paymentIntent?.status === "succeeded") {
      navigate("/order-success");
    }

    stopLoading();
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <h4 className="text-xl font-semibold mb-4 ">Payment Process</h4>

      <form onSubmit={handleSubmit}>
        <Card className="p-6 shadow-lg rounded-lg">
          {/* Payment Element given by Stripe */}
          <PaymentElement onChange={(e) => setIsPaymentComplete(e.complete)} />

          <Button
            type="submit"
            variant="outline"
            className="w-full"
            disabled={isLoading || !isPaymentComplete}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              `Pay Now ($${totalAmount})`
            )}
          </Button>

          {/* Billing Address Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Billing Address:</span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => navigate("/checkout")}
              >
                Edit
              </Button>
            </div>
            {billingAddress ? (
              <div className="text-sm text-gray-700">
                {billingAddress.street} {billingAddress.city},
                <div>
                  {billingAddress.state} {billingAddress.postalCode}{" "}
                  {billingAddress.country}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                No billing address found.
              </div>
            )}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Your payment info is encrypted & never stored by us.
          </p>
        </Card>
      </form>
    </div>
  );
};

export default PaymentForm;
