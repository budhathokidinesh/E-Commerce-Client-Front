import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CheckoutOptionPage = () => {
  return (
    <div className=" bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-medium text-center text-gray-900 mb-16">
            Choose How You Would Like To Check Out
          </h1>

          {/* Checkout Options */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Member Checkout */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  Check out as a Member for free
                </h2>
                <h3 className="text-xl font-medium text-gray-900 mb-6">
                  delivery on orders over $80
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  Use your Member sign-in for our store,
                </p>

                <div className="flex flex-col gap-4">
                  <Button
                    asChild
                    className="w-full h-auto bg-black hover:bg-gray-800 text-white py-4 rounded-full text-base font-medium"
                    size="lg"
                  >
                    <Link to="/login?redirect=/checkout">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full h-auto bg-black hover:bg-gray-800 text-white py-4 rounded-full text-base font-medium"
                    size="lg"
                  >
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Guest Checkout */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <h2 className="text-xl font-medium text-gray-900 mb-8">
                  Check Out as Guest
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  You can create a free account or log in
                  <br />
                  any point during the checkout process.
                </p>

                <Button
                  asChild
                  className="w-full h-auto bg-black hover:bg-gray-800 text-white py-4 px-8  rounded-full text-base font-medium"
                  size="lg"
                >
                  <Link to="/checkout">Guest Checkout</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutOptionPage;
