import { useEffect, useState } from "react";
import axios from "axios";

function useGetProducts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);

    const result = {
      error: null,
      data: null,
    };

    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      result.data = response.data;
    } catch (err) {
      result.error = err.message;
    } finally {
      setLoading(false);
    }

    setData(result);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { loading, result: data };
}

export default useGetProducts;
