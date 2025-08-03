import { v4 as uuidv4 } from "uuid";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../../utils/cartLocalStorage";
import { setCarts, updatePricing } from "./cartSlice";

//Add item to cart
export const addItemToCart =
  (product, selectedColor, selectedSize, quantity) => (dispatch, getState) => {
    // console.log("Redux state:", getState());
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
      //   console.log("🛒 Cart updated (existing item):", updatedCartItems);
    } else {
      updatedCartItems = [...reduxCartItems, cartPayload];
      //   console.log("🛒 Cart updated (new item):", updatedCartItems);
    }

    dispatch(setCarts(updatedCartItems));
    saveCartToLocalStorage(updatedCartItems);

    // Recalculate pricing
    const { isPromoApplied } = getState().cartInfo;
    const pricing = calculatePricing(updatedCartItems, isPromoApplied);
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

  // Recalculate pricing
  const { isPromoApplied } = getState().cartInfo;
  const pricing = calculatePricing(updatedCartItems, isPromoApplied);
  dispatch(updatePricing(pricing));
};

// Update pricing when promo is applied
export const updatePricingOnPromoChange = () => (dispatch, getState) => {
  const { cartItems, isPromoApplied } = getState().cartInfo;
  const pricing = calculatePricing(cartItems, isPromoApplied);
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

    // Recalculate pricing
    const { isPromoApplied } = getState().cartInfo;
    const pricing = calculatePricing(updatedCartItems, isPromoApplied);
    dispatch(updatePricing(pricing));
  };

// Calculate pricing based on cart items and promo status
const calculatePricing = (cartItems, isPromoApplied) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );
  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 80 ? 0 : 7.99;
  const total = subtotal - discount + shipping;

  return { subtotal, discount, shipping, total };
};

// Load cart from localStorage
export const fetchCartFromStorage = () => (dispatch, getState) => {
  const cartItems = getCartFromLocalStorage();
  dispatch(setCarts(cartItems));

  // Calculate and update pricing
  const { isPromoApplied } = getState().cartInfo;
  const pricing = calculatePricing(cartItems, isPromoApplied);
  dispatch(updatePricing(pricing));
};
