// src/components/AdSenseScript.jsx
import { useEffect } from "react";

const AdSenseScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4196464010351609";
    script.async = true;
    script.crossOrigin = "anonymous";
    // ❌ No data-adsense attribute here
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default AdSenseScript;