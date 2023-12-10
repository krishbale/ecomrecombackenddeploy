import React from "react";
import { Paper, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Item = ({ item }) => {
  const { image, id, description, title, brand, price } = item;
  return (
    <>
      <img className="home__image" src={image} alt="" />
    </>
  );
};

export default Item;
