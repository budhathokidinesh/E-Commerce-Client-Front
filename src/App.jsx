import { ToastContainer } from "react-toastify";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import { HomePage } from "./pages/Auth/HomePage";
import ChangePasswordForm from "./components/log-in/ResetPasswordForm";
import ActiveUserPage from "./pages/ActiveUserPage";
import DefaultLayout from "./components/layout/DefaultLayout";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import AllProductsPage from "./pages/products/AllProductsPage";
import CartPage from "./pages/cart/CartPage";
import SuccessPage from "./pages/payment/SuccessPage";
import CancelPage from "./pages/payment/CancelPage";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";
import CheckoutOptionPage from "./pages/checkout/CheckoutOptionPage";
import PaymentPage from "./pages/payment/PaymentPage.jsx";
import WishlistPage from "./pages/wishlist/WishlistPage.jsx";
import ReviewPage from "./pages/review/ReviewPage.jsx";
import UserOrderPage from "./pages/order/UserOrderPage.jsx";
import ProtectedRoute from "./components/helper/ProtectedRoute.jsx";
import OrderTrackingPage from "./pages/order/OrderTrackingPage.jsx";
import ProfileSettingPage from "./pages/Auth/ProfileSettingPage.jsx";
import SupportPage from "./pages/support/SupportPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { autoLoginAction } from "./features/user/userAction.js";
import ChatBotPopup from "./components/aiChatBot/ChatBotPopup.jsx";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const accessJWT = sessionStorage.getItem("accessJWT");
    const refreshJWT = localStorage.getItem("refreshJWT");

    if (accessJWT || refreshJWT) {
      dispatch(autoLoginAction());
    }
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePasswordForm />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/activate-user" element={<ActiveUserPage />} />
          {/* Pages with or without login  */}
          <Route path="/allproducts/*" element={<AllProductsPage />} />
          <Route path="/product-detail/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout-option" element={<CheckoutOptionPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<SuccessPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/cancel" element={<CancelPage />} />

          {/* This is for protedted pages  */}
          <Route
            path="/profileSettings"
            element={
              <ProtectedRoute>
                {" "}
                <ProfileSettingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderHistory"
            element={
              <ProtectedRoute>
                <UserOrderPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/track-order/:id"
            element={
              <ProtectedRoute>
                <OrderTrackingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
      {user?._id && <ChatBotPopup user={user} />}
    </>
  );
}

export default App;
