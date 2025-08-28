import { v4 as uuidv4 } from "uuid";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../../utils/cartLocalStorage";
import { setCarts, setPromoApplied, updatePricing } from "./cartSlice";
import { checkCoupon } from "./couponApi";
import { toast } from "react-toastify";

//Add item to cart
export const addItemToCart =
  (product, selectedColor, selectedSize, quantity) => (dispatch, getState) => {
    // Get current cart from Redux
    const reduxCartItems = getState().cartInfo.cartItems;

    const cartPayload = {
      _id: uuidv4(),
      product_id: product._id,
      product_title: product.title,
      color: selectedColor,
      size: selectedSize,
      discountPrice: product.discountPrice,
      price: product.price,
      quantity: quantity,
      thumbnail: product.thumbnail,
      mainCategory: product.mainCategory,
    };

    // Check if item exists, update or add
    let updatedCartItems;
    const existingItemIndex = reduxCartItems.findIndex(
      (item) =>
        item.product_id === cartPayload.product_id &&
        item.color === cartPayload.color &&
        item.size === cartPayload.size
    );

    if (existingItemIndex !== -1) {
      updatedCartItems = reduxCartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + cartPayload.quantity }
          : item
      );
    } else {
      updatedCartItems = [...reduxCartItems, cartPayload];
    }

    dispatch(setCarts(updatedCartItems));
    saveCartToLocalStorage(updatedCartItems);

    // Recalculate pricing with current coupon data
    const { isPromoApplied, appliedCoupon } = getState().cartInfo;
    const pricing = calculatePricing(
      updatedCartItems,
      isPromoApplied,
      appliedCoupon
    );
    dispatch(updatePricing(pricing));
  };

// delete a cart product
export const deleteCartItem = (itemId) => (dispatch, getState) => {
  const existingCartItems = getCartFromLocalStorage();
  const updatedCartItems = existingCartItems.filter(
    (item) => item._id !== itemId
  );
  dispatch(setCarts(updatedCartItems));
  saveCartToLocalStorage(updatedCartItems);

  // Recalculate pricing with current coupon data
  const { isPromoApplied, appliedCoupon } = getState().cartInfo;
  const pricing = calculatePricing(
    updatedCartItems,
    isPromoApplied,
    appliedCoupon
  );
  dispatch(updatePricing(pricing));
};

// Update pricing when promo is applied
export const updatePricingOnPromoChange = () => (dispatch, getState) => {
  const { cartItems, isPromoApplied, appliedCoupon } = getState().cartInfo;
  const pricing = calculatePricing(cartItems, isPromoApplied, appliedCoupon);
  dispatch(updatePricing(pricing));
};

//update a quantity in cart
export const updateCartItemQuantity =
  (itemId, quantity) => (dispatch, getState) => {
    const existingCartItems = getCartFromLocalStorage();
    const updatedCartItems = existingCartItems.map((item) =>
      item._id === itemId ? { ...item, quantity } : item
    );
    dispatch(setCarts(updatedCartItems));
    saveCartToLocalStorage(updatedCartItems);

    // Recalculate pricing with current coupon data
    const { isPromoApplied, appliedCoupon } = getState().cartInfo;
    const pricing = calculatePricing(
      updatedCartItems,
      isPromoApplied,
      appliedCoupon
    );
    dispatch(updatePricing(pricing));
  };

// Calculate pricing based on cart items and coupon data
const calculatePricing = (cartItems, isPromoApplied, appliedCoupon = null) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );

  let discount = 0;

  if (isPromoApplied && appliedCoupon) {
    // Value is always a percentage (0-100)
    discount = subtotal * (appliedCoupon.value / 100);
  }

  const shipping = subtotal > 80 ? 0 : 7.99;
  const total = Math.max(0, subtotal - discount + shipping); // Ensure total is not negative

  return { subtotal, discount, shipping, total };
};

// Load cart from localStorage
export const fetchCartFromStorage = () => (dispatch, getState) => {
  const cartItems = getCartFromLocalStorage();
  dispatch(setCarts(cartItems));

  // Calculate and update pricing with current coupon data
  const { isPromoApplied, appliedCoupon } = getState().cartInfo;
  const pricing = calculatePricing(cartItems, isPromoApplied, appliedCoupon);
  dispatch(updatePricing(pricing));
};

//This is for clear the cart
export const clearCart = () => (dispatch) => {
  dispatch(setCarts([]));
  saveCartToLocalStorage([]);
  dispatch(updatePricing({ subtotal: 0, discount: 0, shipping: 0, total: 0 }));
  // Clear any applied coupons when cart is cleared
  dispatch(
    setPromoApplied({
      isPromoApplied: false,
      promoCode: "",
      appliedCoupon: null,
    })
  );
};

// Apply promo code with backend validation
export const handleApplyPromo = async (promoCode, dispatch) => {
  try {
    const response = await checkCoupon({ code: promoCode.trim() });

    if (response.status === "success") {
      dispatch(
        setPromoApplied({
          isPromoApplied: true,
          promoCode: response.payload.code,
          appliedCoupon: response.payload,
        })
      );

      toast.success(`Promo code applied! ${response.payload.value}% off`);
    }

    // Recalculate pricing with the new coupon
    dispatch(updatePricingOnPromoChange());
  } catch (error) {
    dispatch(
      setPromoApplied({
        isPromoApplied: false,
        promoCode: "",
        appliedCoupon: null,
      })
    );
    if (error.response?.status === 404) {
      toast.error(error.response.data.message);
    }
  }
};

// Remove applied coupon
export const removeCoupon = () => (dispatch, getState) => {
  dispatch(
    setPromoApplied({
      isPromoApplied: false,
      promoCode: "",
      appliedCoupon: null,
    })
  );

  // Recalculate pricing without coupon
  const { cartItems } = getState().cartInfo;
  const pricing = calculatePricing(cartItems, false, null);
  dispatch(updatePricing(pricing));

  toast.success("Coupon removed");
};
