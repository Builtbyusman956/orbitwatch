import { useState, useEffect } from "react";
import { fetchAPOD, fetchAPODRange, fetchNearEarthObjects } from "../services/nasaAPI";

export const useAPOD = (date = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await fetchAPOD(date);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [date]);

  return { data, loading, error };
};

export const useAPODRange = (startDate, endDate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await fetchAPODRange(startDate, endDate);
        setData(Array.isArray(result) ? result.reverse() : [result]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (startDate && endDate) fetch();
  }, [startDate, endDate]);

  return { data, loading, error };
};

export const useNEO = (days = 7) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - days);
        
        const format = (d) => d.toISOString().split("T")[0];
        const result = await fetchNearEarthObjects(format(start), format(end));
        
        const all = Object.values(result.near_earth_objects).flat();
        const sorted = all.sort((a, b) => 
          new Date(a.close_approach_data[0].epoch_date_close_approach) - 
          new Date(b.close_approach_data[0].epoch_date_close_approach)
        );
        
        setData(sorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [days]);

  return { data, loading, error };
};