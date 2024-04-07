import React, { useState, createContext } from "react";
import all_product from "../Components/Assets/all_product";



export const ShopContext = createContext();

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [Cartitems, setCartitems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in Cartitems) {
      if (Cartitems[itemId] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(itemId));
        totalAmount += itemInfo.new_price * Cartitems[itemId];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const itemId in Cartitems) {
      if (Cartitems[itemId] > 0) {
        totalItem += Cartitems[itemId];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartAmount,
    getTotalCartItems,
    all_product,
    Cartitems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
