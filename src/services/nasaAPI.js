const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov";

// Cache to track API health
let nasaAPIHealthy = true;
let lastCheck = 0;

export const fetchAPOD = async (date = null) => {
  const now = Date.now();
  
  // Try live API if marked healthy and it's been more than 5 minutes since last failure
  if (nasaAPIHealthy || now - lastCheck > 300000) {
    try {
      const url = date 
        ? `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
        : `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`;
      
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      
      if (res.ok) {
        nasaAPIHealthy = true;
        return res.json();
      }
      
      // If 500 or other error, mark as unhealthy
      nasaAPIHealthy = false;
      lastCheck = now;
      throw new Error(`NASA API: ${res.status}`);
      
    } catch (error) {
      nasaAPIHealthy = false;
      lastCheck = now;
      console.log("NASA API down, using fallback:", error.message);
    }
  }
  
  // Return fallback
  return getFallbackAPOD();
};

export const fetchAPODRange = async (startDate, endDate) => {
  const now = Date.now();
  
  if (nasaAPIHealthy || now - lastCheck > 300000) {
    try {
      const url = `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}&start_date=${startDate}&end_date=${endDate}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      
      if (res.ok) {
        nasaAPIHealthy = true;
        const data = await res.json();
        return Array.isArray(data) ? data : [data];
      }
      
      nasaAPIHealthy = false;
      lastCheck = now;
      throw new Error(`NASA API: ${res.status}`);
      
    } catch (error) {
      nasaAPIHealthy = false;
      lastCheck = now;
    }
  }
  
  return [getFallbackAPOD()];
};

export const fetchNearEarthObjects = async (startDate, endDate) => {
  const now = Date.now();
  
  if (nasaAPIHealthy || now - lastCheck > 300000) {
    try {
      const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      
      if (res.ok) {
        nasaAPIHealthy = true;
        return res.json();
      }
      
      nasaAPIHealthy = false;
      lastCheck = now;
      throw new Error(`NEO API: ${res.status}`);
      
    } catch (error) {
      nasaAPIHealthy = false;
      lastCheck = now;
    }
  }
  
  return { near_earth_objects: {} };
};

// Simple fallback - no external images
function getFallbackAPOD() {
  return {
    title: "Astronomy Picture of the Day",
    explanation: "NASA's daily astronomy image is temporarily unavailable. The live feed will automatically resume when the service is restored.",
    url: "",
    date: new Date().toISOString().split("T")[0],
    media_type: "none",
    serviceStatus: "unavailable"
  };
}