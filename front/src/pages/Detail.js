import React from "react";
import "../styles/Detail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCartContext } from "../context/Cartcontext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Fetchsingledata } from "../hooks/Fetchdata";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Fetchallproducts } from "../hooks/FetchAll";
import LoadingAnimations from "../components/LoadingAnimations";
import Card from "../components/Card";
import { Button } from "../components/Button";
const Detail = () => {
  let { id } = useParams();
  const { addtoCart } = useCartContext();
  let navigate = useNavigate();

  const { allproducts } = Fetchallproducts(`/getrecom/${id}`, id);

  let array = allproducts;

  const { data, loading } = Fetchsingledata(id);
  const handleClick = () => {
    navigate("/checkoutpage");
    addtoCart(data.id, data.price, data);
  };

  if (loading) {
    return <LoadingAnimations />;
  } else if (!loading) {
    return (
      <>
        <div className="detail">
          <div className="image-container">
            <div className="image">
              <img src={data.image} alt="" />
            </div>
          </div>
          <div className="description">
            <div className="title">
              <h1>{data.title}</h1>
            </div>
            <div className="des">
              <p>{data.description}</p>
            </div>

            <span>
              <h3>Price:${data.price}</h3>

              <Button
                onClick={() => addtoCart(data.id, data.price, data)}
                className="cartbutton"
              >
                {" "}
                <h4>Add To Cart</h4> <br /> <AddShoppingCartIcon />
              </Button>
              <Button onClick={handleClick} className="cartbutton">
                Buy
              </Button>
              <div>
                <Button className="back" onClick={() => navigate(-1)}>
                  {" "}
                  <ArrowBackIcon /> <h4>Continue Shopping</h4>
                </Button>
              </div>
            </span>
          </div>
        </div>

        <div className="product_section  center">
          <Button>Recommended products for you</Button>
        </div>

        <div className="productitem">
          {array.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      </>
    );
  }
};

export default Detail;
