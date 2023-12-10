import React from "react";
import "../styles/loadinganim.css";
const LoadingAnimations = () => {
  return (
    <>
      <div className="body">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default LoadingAnimations;
