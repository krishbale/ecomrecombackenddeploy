import React, { useEffect, useContext, useState } from "react";
import { LoginContext } from "../App";
import LoadingAnimations from "../components/LoadingAnimations";
import InstantMessage from "../components/InstantMessage";
const Logout = () => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const { dispatch } = useContext(LoginContext);

  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: undefined });
        setMessage("User Logged Out");
        setAlert(true);

        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <>
      {alert ? <InstantMessage message={message} /> : ``}
      <LoadingAnimations />
    </>
  );
};

export default Logout;
