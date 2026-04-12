import { useEffect, useEffectEvent, useState } from "react";

const getErrorMessage = (error, fallbackMessage) =>
  typeof fallbackMessage === "function"
    ? fallbackMessage(error)
    : fallbackMessage ?? "";

export const useAsyncData = (
  fetcher,
  { enabled = true, errorMessage = "", initialData = null, watch } = {}
) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);

  const runFetch = useEffectEvent(async (isActive = () => true) => {
    setLoading(true);
    setError("");

    try {
      const result = await fetcher();

      if (isActive()) {
        setData(result);
      }
    } catch (err) {
      console.error(err);

      if (isActive()) {
        setError(getErrorMessage(err, errorMessage));
      }
    } finally {
      if (isActive()) {
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setError("");
      return;
    }

    let isActive = true;

    runFetch(() => isActive);

    return () => {
      isActive = false;
    };
  }, [enabled, reloadCount, watch]);

  return {
    data,
    error,
    loading,
    refresh: () => setReloadCount((count) => count + 1),
    setData,
  };
};
