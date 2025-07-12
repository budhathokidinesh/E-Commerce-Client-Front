import { v4 as uuidv4 } from "uuid";

// Local storage key for cart items
const CART_STORAGE_KEY = "ecommerce_cart_items";

// Get cart items from localStorage
export const getCartFromLocalStorage = () => {
  try {
    const cartItems = localStorage.getItem(CART_STORAGE_KEY);
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

// Save cart items to localStorage
export const saveCartToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Add item to cart in localStorage
export const addToLocalCart = (cartItem) => {
  const existingCart = getCartFromLocalStorage();

  // Check if item already exists with same product_id, color, and size
  const existingItemIndex = existingCart.findIndex(
    (item) =>
      item.product_id === cartItem.product_id &&
      item.color === cartItem.color &&
      item.size === cartItem.size
  );

  if (existingItemIndex !== -1) {
    // Update quantity if item already exists
    existingCart[existingItemIndex].quantity += cartItem.quantity;
  } else {
    // Add new item with unique id
    const newItem = {
      ...cartItem,
      _id: uuidv4(), // Generate unique id for local storage
    };
    existingCart.push(newItem);
  }

  saveCartToLocalStorage(existingCart);
  return existingCart;
};

// Update cart item quantity in localStorage
export const updateLocalCartItemQuantity = (itemId, newQuantity) => {
  const existingCart = getCartFromLocalStorage();
  const updatedCart = existingCart.map((item) =>
    item.id === itemId || item._id === itemId
      ? { ...item, quantity: newQuantity }
      : item
  );
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
};

// Remove item from cart in localStorage
export const removeFromLocalCart = (itemId) => {
  const existingCart = getCartFromLocalStorage();
  const updatedCart = existingCart.filter(
    (item) => item.id !== itemId && item._id !== itemId
  );
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
};

// Clear all cart items from localStorage
export const clearLocalCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing local cart:", error);
  }
};

// Check if user is logged in (has access token)
export const isUserLoggedIn = () => {
  const accessToken = sessionStorage.getItem("accessJWT");
  return !!accessToken;
};

// Get cart items based on user login status
export const getCartItems = () => {
  if (isUserLoggedIn()) {
    // Return null to indicate server fetch is needed
    return null;
  } else {
    // Return local storage items
    return getCartFromLocalStorage();
  }
};
