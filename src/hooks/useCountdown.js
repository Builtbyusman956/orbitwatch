import { useState, useEffect } from "react";

export const useCountdown = (targetDateUnix) => {
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!targetDateUnix) return;

    const calculate = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = targetDateUnix - now;

      if (diff <= 0) {
        setCountdown("Launched!");
        setIsExpired(true);
        return;
      }

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      setIsExpired(false);
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDateUnix]);

  return { countdown, isExpired };
};