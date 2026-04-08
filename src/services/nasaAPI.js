const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov";

console.log("NASA API Key:", NASA_API_KEY); // Debug

export const fetchAPOD = async (date = null) => {
  const url = date 
    ? `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
    : `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`;
  
  console.log("Fetching APOD URL:", url);
  
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("APOD error response:", errorText);
    throw new Error(`Failed to fetch APOD: ${res.status} ${errorText}`);
  }
  return res.json();
};

export const fetchAPODRange = async (startDate, endDate) => {
  const url = `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}&start_date=${startDate}&end_date=${endDate}`;
  
  console.log("Fetching APOD range URL:", url);
  
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("APOD range error response:", errorText);
    throw new Error(`Failed to fetch APOD range: ${res.status} ${errorText}`);
  }
  return res.json();
};

export const fetchNearEarthObjects = async (startDate, endDate) => {
  const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
  
  console.log("Fetching NEO URL:", url);
  
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("NEO error response:", errorText);
    throw new Error(`Failed to fetch NEO: ${res.status} ${errorText}`);
  }
  return res.json();
};