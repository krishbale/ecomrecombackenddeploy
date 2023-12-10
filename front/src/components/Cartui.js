import "../styles/cartui.css";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Button } from "./Button";
import { Wrapper } from "./Cart.style";
import { useCartContext } from "../context/Cartcontext";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
const Cartui = () => {
  const navigate = useNavigate();
  const { cart, clearCart, totalAmount } = useCartContext();
  return (
    <>
      <Wrapper>
        <h2>Your Cart</h2>
        {cart.length === 0 ? <p>No items in cart.</p> : null}
        {cart.map((curElem, index) => (
          <CartItem key={index} curElem={curElem} />
        ))}

        <h2>Total Set:{cart.length}</h2>
        <h2>Total: ${totalAmount}</h2>
        {cart.length && (
          <>
            <div>
              <Button onClick={clearCart}>
                <RemoveShoppingCartIcon /> Remove All
              </Button>
            </div>

            <br />
            <div>
              <Button onClick={() => navigate("/checkoutpage")}>
                Checkout
              </Button>
            </div>

            <br />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Cartui;
