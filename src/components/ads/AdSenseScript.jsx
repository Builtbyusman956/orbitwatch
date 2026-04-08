import { useEffect } from "react";

const AdSenseScript = () => {
  useEffect(() => {
    // Only add script once
    if (document.querySelector('script[data-adsense="true"]')) return;
    
    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_ADSENSE_CLIENT_ID}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.adsense = "true";
    
    document.head.appendChild(script);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};

export default AdSenseScript;