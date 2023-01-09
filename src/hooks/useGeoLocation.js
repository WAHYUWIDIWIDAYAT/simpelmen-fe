import { useEffect, useState } from "react";

const useGeoLocation = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getLocation = async () => {
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
    if (url) getLocation();
  }, [url]);

  return { data, isLoading };
};

export default useGeoLocation;
