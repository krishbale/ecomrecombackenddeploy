import React, { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer/useReducer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Slider from "./pages/Slider";
import About from "./pages/About";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import { Route, Routes } from "react-router-dom";

export const LoginContext = createContext({});
function App() {
  const [username, dispatch] = useReducer(reducer, initialState);

  const FetchUserAuth = async () => {
    try {
      const res = await fetch("/isAuth");
      const data = await res.json();
      const username = data.username;
      if (username) {
        dispatch({ type: "USER", payload: username });
      }

      if (!res.ok) {
        dispatch({ type: "USER", payload: undefined });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    FetchUserAuth();
  }, []);
  return (
    <LoginContext.Provider value={{ username, dispatch }}>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/allproducts" element={<Slider />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/details/:id" element={<Detail />} />
        <Route path="/checkoutpage" element={<Checkout />} />

        <Route path="/login" element={<Login />} />
        <Route path="/payment/esewa" element={<Payment />} />
        <Route path="/paymentsuccess" element={<>Payment successfull</>} />
        <Route path="/paymentfailed" element={<>Payment failed</>} />
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
