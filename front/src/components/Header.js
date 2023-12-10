import React, { useContext } from "react";
import "../styles/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { Button, Drawer } from "@mui/material";
import logo from "../assets/black.png";
import { LoginContext } from "../App";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/Cartcontext";
import { useState } from "react";
import Cartui from "./Cartui";
function Header() {
  const { username } = useContext(LoginContext);

  const [cartOpen, setCartOpen] = useState(false);
  const { totalItem } = useCartContext();
  const [setQuery] = useState("");
  const handleSearch = (e) => {};
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="header__logo" alt="headerlogo" src={logo} />
      </Link>

      <div className="header__search">
        <input
          placeholder="Search"
          onChange={(e) => [setQuery(e.target.value), handleSearch()]}
          className="header__searchInput"
          type="text"
        />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={username === undefined ? "/login" : "/logout"}>
          <div className="header__option">
            <span className="header__optionLineOne">
              Hello {username === undefined ? "Guest" : username}
            </span>
            <span className="header__optionLineTwo">
              {username === undefined ? "Sign IN" : "Sign Out"}
            </span>
          </div>
        </Link>

        <Link to={"/allproducts"}>
          <div className="header__option">
            <span className="header__optionLineOne">All Products</span>
            <span className="header__optionLineTwo">& Categories</span>
          </div>
        </Link>

        <Link to={"/checkoutpage"}>
          <div className="header__option">
            <span className="header__optionLineOne">Check out</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cartui />
        </Drawer>

        <div className="header__optionBasket">
          <Button
            style={{
              color: "white",
            }}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCartSharpIcon />
            <span className="header__optionLineTwo header__basketCount">
              {totalItem}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
