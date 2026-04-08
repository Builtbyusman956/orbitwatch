const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov";

export const fetchAPOD = async (date = null) => {
  const url = date 
    ? `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
    : `${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`;
  
  try {
    const res = await fetch(url);
    
    // Check for rate limit (429) or other errors
    if (!res.ok) {
      console.error(`APOD API error: ${res.status} - ${await res.text()}`);
      
      // Return fallback data instead of breaking
      return {
        title: "APOD Service Unavailable",
        explanation: "NASA API rate limit exceeded or service temporarily down. Please try again later.",
        url: "https://apod.nasa.gov/apod/image/2404/NGC3628_Colombari_960.jpg", // Fallback space image
        hdurl: "https://apod.nasa.gov/apod/image/2404/NGC3628_Colombari_960.jpg",
        date: new Date().toISOString().split("T")[0],
        media_type: "image",
        copyright: "NASA"
      };
    }
    
    return res.json();
  } catch (error) {
    console.error("APOD fetch error:", error);
    
    // Return fallback on network error
    return {
      title: "Connection Error",
      explanation: "Unable to connect to NASA API. Please check your internet connection.",
      url: "https://via.placeholder.com/800x600?text=NASA+APOD+Unavailable",
      date: new Date().toISOString().split("T")[0],
      media_type: "image"
    };
  }
};