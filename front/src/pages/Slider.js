import "../styles/Slider.css";
import { useState } from "react";
import { Fetchallproducts } from "../hooks/FetchAll";
import LoadingAnimations from "../components/LoadingAnimations";
import Card from "../components/Card";

import "react-responsive-carousel/lib/styles/carousel.min.css"; //

function Slider() {
  const { allproducts, loading } = Fetchallproducts("/products");

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [hidemenu, sethidemenu] = useState(false);

  const handleSearch = (e) => {
    const results = allproducts.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  };

  if (loading) {
    return <LoadingAnimations />;
  }

  const filteredProduct = (cat) => {
    const updatedList = allproducts.filter((x) => x.category === cat);
    setFiltered(updatedList);

    sethidemenu(true);
  };
  return (
    <>
      <div className="section_slider">
        <div className="category">
          <div className="dropdown-content">
            <button
              className="categories"
              onClick={() => setFiltered(allproducts)}
            >
              All
            </button>
            <button
              className="categories"
              onClick={() => filteredProduct("watch")}
            >
              Watch
            </button>
            <button
              className="categories"
              onClick={() => filteredProduct("laptop")}
            >
              Laptop
            </button>
            <button
              className="categories"
              onClick={() => filteredProduct("electronics")}
            >
              Electronics
            </button>
            <button
              className="categories"
              onClick={() => filteredProduct("mobile")}
            >
              Mobile
            </button>
            <input
              placeholder="Search"
              className="search"
              type="text"
              onChange={(e) => [setQuery(e.target.value), handleSearch()]}
            />
          </div>
        </div>

        <div className="productitem">
          {filtered.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
        <div className={`productitem ${hidemenu ? " hide" : ""} `}>
          {allproducts.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Slider;
