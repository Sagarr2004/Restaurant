import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [login,setLogin] = useState(false);
  // const [user, setUser] = useState(null);
  // console.log("Cart items:",cartItems);
  console.log('Login',login);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems,login,setLogin}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
