import { useState } from "react";
import { useEffect } from "react";
const useTopFetch = (fetchFunction, initVal, user, initLimit) => {
  const [isFetching, setIsFetching] = useState(false);
  const [top, setTop] = useState(initVal);
  const [limit, setLimit] = useState(initLimit);
  const [timeRange, setTimeRange] = useState('short_term');
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const loadTop = async () => {
      setIsFetching(true);
      try {
        const fetchedTop = await fetchFunction(timeRange, limit);
        setTop(fetchedTop);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setFetchError(error);
        setIsFetching(false);
      }
    };

    if (user) {
      loadTop();
    }
  }, [user, timeRange, limit, fetchFunction]);

  return {
    top,
    setTop,
    timeRange,
    setTimeRange,
    limit,
    setLimit
  };
};

export default useTopFetch;
