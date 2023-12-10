import React, { useContext } from "react";
import { LoginContext } from "../App";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer, Icon } from "@mui/material";
import { useState } from "react";

import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";

import "../styles/NavBar.css";

import { useCartContext } from "../context/Cartcontext";

import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import Cartui from "./Cartui";

const NavBar = () => {
  const [showmenu, setshowmenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { state } = useContext(LoginContext);
  const { totalItem } = useCartContext();
  const handlemenu = () => {
    showmenu ? setshowmenu(false) : setshowmenu(true);
  };

  return (
    <>
      {/* productitem ${hidemenu ? ' hide' : ''} `}> */}
      <div className="header">
        <div onClick={handlemenu} className={`hamburger`}>
          <Icon fontSize="large">
            <MenuIcon className={`${showmenu ? "close" : " show"}`} />
            <LogoutSharpIcon className={` ${showmenu ? "show" : " close"}`} />
          </Icon>
        </div>
        <nav className={`navbar ${showmenu ? " nav_open" : " nav_close"}`}>
          <ul>
            <li>
              <Link to="/">{/* <img src={logo} alt="Logo" /> */}</Link>
            </li>
          </ul>
          <ul>
            {state === "false" ? (
              <>
                <li onClick={handlemenu} className="nav_items active">
                  <Link to="/login">
                    <AccountCircleIcon />
                  </Link>
                </li>
                <li onClick={handlemenu} className="nav_items active">
                  <Link to="/register">
                    <PersonAddIcon />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li onClick={handlemenu} className="nav_items active">
                  <Link to="/">Home</Link>
                </li>

                <li onClick={handlemenu} className="nav_items active">
                  <Link to="/checkoutpage"> Checkout</Link>
                </li>

                <Drawer
                  anchor="right"
                  open={cartOpen}
                  onClose={() => setCartOpen(false)}
                >
                  <Cartui />
                </Drawer>
                <Button onClick={() => setCartOpen(true)}>
                  <Badge badgeContent={totalItem} color="error">
                    <ShoppingCartSharpIcon />
                  </Badge>
                </Button>

                {/* <span className='noti_count'>{totalItem}</span> */}
                {/* </Link> */}
                {/* </li> */}

                <li onClick={handlemenu} className="nav_items active">
                  <Link to="/logout">
                    <PersonRemoveIcon />
                  </Link>
                </li>
                <li></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
