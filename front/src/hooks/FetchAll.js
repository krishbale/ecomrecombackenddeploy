import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Fetchallproducts = (url, id) => {
  const navigate = useNavigate();
  const [loading, isloading] = useState(true);
  const [allproducts, setAllproductss] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        isloading(true);
        const { data } = await axios.get(url);

        let products = data.data ? data.data : data.recomdata;
        setAllproductss(products);

        if (Array.isArray(products)) {
          isloading(false);
        }
      } catch (e) {
        console.log(e.response.data);
        if (e.response.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [id]);
  return { allproducts, loading };
};
export { Fetchallproducts };
