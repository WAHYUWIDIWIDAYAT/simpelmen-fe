import { useEffect, useState } from "react";

const useProducts = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const response = await fetch(url);
        if (response) {
          const data = await response.json();
          setData(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
      }
    };
    if (url) getProductDetail();
  }, [url]);

  return { data, isLoading };
};

export default useProducts;
