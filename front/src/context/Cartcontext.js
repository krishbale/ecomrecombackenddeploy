import { createContext, useEffect, useContext, useReducer } from "react";
import reducer from "../context/Cartreducer";
const CartContext = createContext();
const getLocalCartData = () => {
  let LocalCartData = localStorage.getItem("Cart");
  const parseData = JSON.parse(LocalCartData);
  if (!Array.isArray(parseData)) return [];
  return parseData;
};
const CartProvider = ({ children }) => {
  const initialState = {
    cart: getLocalCartData(),
    totalAmount: 0,
    totalItem: 0,
    shipping_fee: 500,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const addtoCart = (id, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, amount, product } });
    // console.log(products)
  };
  const removeItem = (id) => {
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };
  const increment = (id) => {
    return dispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  };
  const decrement = (id) => {
    return dispatch({
      type: "SUB_ITEM",
      payload: id,
    });
  };
  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
    localStorage.setItem("Cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <CartContext.Provider
        value={{
          ...state,
          addtoCart,
          removeItem,
          increment,
          decrement,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
const useCartContext = () => {
  return useContext(CartContext);
};
export { CartProvider, useCartContext };
