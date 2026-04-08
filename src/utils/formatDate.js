export const formatDate = (dateString, options = {}) => {
  if (!dateString) return "N/A";
  
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options
  };
  return new Date(dateString).toLocaleDateString("en-US", defaultOptions);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export const formatDistance = (km) => {
  if (!km || isNaN(km)) return "Unknown";
  
  if (km > 1000000) return `${(km / 1000000).toFixed(2)}M km`;
  if (km > 1000) return `${(km / 1000).toFixed(1)}k km`;
  return `${Math.round(km)} km`;
};

export const formatVelocity = (kph) => {
  if (!kph || isNaN(kph)) return "Unknown";
  
  return `${parseInt(kph).toLocaleString()} km/h`;
};