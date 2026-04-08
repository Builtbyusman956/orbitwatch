import { useState, useEffect } from "react";
import { fetchAllLaunches, fetchLatestLaunch } from "../services/spaceAPI";

export const useLaunches = (limit = 30) => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching launches...");
        const result = await fetchAllLaunches(limit);
        console.log("Launches result:", result);
        setLaunches(result.docs || []);
      } catch (err) {
        console.error("Launches error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [limit]);

  return { launches, loading, error };
};

export const useLatestLaunch = () => {
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching latest launch...");
        const result = await fetchLatestLaunch();
        console.log("Latest launch result:", result);
        setLaunch(result);
      } catch (err) {
        console.error("Latest launch error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { launch, loading, error };
};