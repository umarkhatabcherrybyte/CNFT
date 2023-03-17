import { useState, useEffect } from "react";

function useFetchData(fetchFn, interval) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchFn()
      .then((response) => {
        setData(response.data[0]);
      })
      .catch(() => {});
    const fetchDataInterval = setInterval(() => {
      fetchFn()
        .then((response) => {
          setData(response.data[0]);
        })
        .catch(() => {});
    }, interval);
    return () => clearInterval(fetchDataInterval);
  }, [fetchFn, interval]);

  return data;
}

export default useFetchData;
