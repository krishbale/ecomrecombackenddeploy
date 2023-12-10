import React from "react";

import { useCartContext } from "../context/Cartcontext";

const Payment = () => {
  const { totalAmount } = useCartContext();

  var path = "https://uat.esewa.com.np/epay/main";
  var params = {
    amt: totalAmount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: totalAmount,
    pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
    scd: "EPAYTEST",
    su: "http://merchant.com.np/page/esewa_payment_success",
    fu: "http://merchant.com.np/page/esewa_payment_failed",
  };

  function post(path, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  }
  return (
    <>
      <h1>Connecting with Esewa API ....</h1>

      <input value="Submit" hidden type="submit" onClick={post(path, params)} />
    </>
  );
};

export default Payment;
