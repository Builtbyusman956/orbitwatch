import { useEffect, useRef } from "react";

const AdSense = ({ 
  adSlot, 
  adFormat = "auto", 
  style = {}, 
  className = "" 
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Check if adsbygoogle is loaded
    if (window.adsbygoogle && adRef.current) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block", ...style }}
      data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
};

export default AdSense;