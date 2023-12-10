import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const Card = ({ product }) => {
  const { id, title, price, image, score } = product;
  console.log(score);
  return (
    <>
      <div className="card">
        <Typography>{score ? `score ${score}` : ""}</Typography>
        <div className="item">
          <Link to={`/details/${id}`}>
            <div className="image">
              <img src={image} alt={title} />
              <div className="overlay">
                <div className="learnmore">
                  <h3>Learn More </h3>
                </div>
              </div>
            </div>
          </Link>
          <div className="des">
            <h3>{title.substring(0, 18)}...</h3>
            <span>
              <div>
                <h5>Price:{price}</h5>
              </div>
              <div></div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
