import { useState, useEffect } from "react";

import axios from "axios";

const Fetchsingledata = (id) => {
  const [data, setData] = useState({});
  const [loading, isloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        isloading(true);
        const { data } = await axios.get("/products");
        let products = data.data;
        let singleproduct = products.find((item) => item.id === id);

        setData(singleproduct);

        if (typeof singleproduct !== "undefined") {
          isloading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);
  return { data, loading };
};
export { Fetchsingledata };
