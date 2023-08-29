import React, { useEffect } from "react";
import { createContext, useState } from "react";

// <!-- cart item check -->
const addCartItem = (cartItem, productToAdd) => {
  // <!- find if exist, if exsiting incr qty & return new array>

  const exsitingCartItem = cartItem.find(
    (cartItem) => cartItem?.id === productToAdd?.id
  );

  // cartItem exsit then send new array of cart item and quantity +1 ELSE return cart item
  if (exsitingCartItem) {
    return cartItem?.map((cartItem) =>
      cartItem?.id === productToAdd?.id
        ? { ...cartItem, quantity: cartItem?.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItem, { ...productToAdd, quantity: 1 }];
};

// <!-- cart context -->
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

// <!-- cart context return -->
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItem?.reduce(
      (total, cartItem) => total + cartItem?.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItem]);

  const addItemToCart = (productToAdd) => {
    setCartItem(addCartItem(cartItem, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItem,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
