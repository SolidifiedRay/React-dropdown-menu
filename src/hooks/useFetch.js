import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(pageNum) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lists, setLists] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel;

    setIsLoading(true);
    setError(false);

    axios
      .get(`https://openlibrary.org/search.json?q=a&page=${pageNum}`, {
        cancelToken: new CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLists((prev) => {
          return [
            ...new Set([
              ...prev,
              ...res.data.docs.map((d) => ({ value: d.title, label: d.title })),
            ]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err);
      });

    return () => cancel();
  }, [pageNum]);

  return { isLoading, error, lists, hasMore };
}

export default useFetch;
