import React from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCartContext } from "../context/Cartcontext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Wrapper } from "./CartItem.style";
import { Button } from "@mui/material";
const CartItem = ({ curElem }) => {
  const { removeItem, increment, decrement } = useCartContext();

  const { id, price, quantity, title, image } = curElem;
  return (
    <>
      <Wrapper>
        <div>
          <h3>{curElem.title}</h3>
          <div className="information">
            <p> Price :${price}</p>
            <br />

            <p>Sets: {quantity}</p>
            <br />
            <p>Sub-Total: ${(price * quantity).toFixed(2)}</p>
          </div>
          <div className="buttons">
            <Button
              variant="contained"
              size="small"
              disableElevation
              style={{
                borderRadius: 35,
                // color:'##f57224',
                backgroundColor: "#f57224",
                padding: "18px 36px",
                fontSize: "18px",
              }}
              onClick={() => decrement(id)}
            >
              <RemoveCircleIcon />
            </Button>
            <p>{curElem.amount}</p>
            <Button
              size="small"
              style={{
                borderRadius: 35,
                // color:'#
                backgroundColor: "#f57224",
                padding: "18px 36px",
                fontSize: "18px",
              }}
              disableElevation
              variant="contained"
              onClick={() => increment(id)}
            >
              <AddCircleIcon />
            </Button>
            <Button
              size="small"
              disableElevation
              variant="contained"
              style={{
                borderRadius: 35,
                // color:'#
                backgroundColor: "#f57224",
                padding: "18px 36px",
                fontSize: "18px",
              }}
              onClick={() => removeItem(id)}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
        <img src={image} alt={title} />
      </Wrapper>
    </>
  );
};

export default CartItem;
