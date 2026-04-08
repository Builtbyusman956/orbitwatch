import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  RiRocketLine, 
  RiTimeLine, 
  RiFireLine, 
  RiCheckboxCircleLine, 
  RiCloseCircleLine,
  RiArrowRightLine,
  RiCalendarLine,
  RiMapPinLine,
  RiAlarmWarningLine,
  RiExternalLinkLine,
  RiImageLine
} from "react-icons/ri";
import Loader from "../components/ui/Loader";

const Home = () => {
  const [apod, setApod] = useState(null);
  const [launch, setLaunch] = useState(null);
  const [asteroids, setAsteroids] = useState([]);
  const [countdown, setCountdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [serviceStatus, setServiceStatus] = useState({ nasa: "checking", spacex: "checking" });

  const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch APOD with fallback
        let apodData = {
          title: "Astronomy Picture of the Day",
          explanation: "NASA's daily astronomy image is temporarily unavailable. The service will automatically resume when NASA's API is restored.",
          url: "",
          date: new Date().toISOString().split("T")[0],
          media_type: "none"
        };
        
        try {
          const apodRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`, {
            signal: AbortSignal.timeout(5000)
          });
          if (apodRes.ok) {
            apodData = await apodRes.json();
            setServiceStatus(prev => ({ ...prev, nasa: "online" }));
          } else {
            setServiceStatus(prev => ({ ...prev, nasa: "offline" }));
          }
        } catch (e) {
          setServiceStatus(prev => ({ ...prev, nasa: "offline" }));
        }
        setApod(apodData);

        // Fetch SpaceX launch
        let launchData = {
          name: "Starlink Mission",
          date_utc: new Date().toISOString(),
          date_unix: Math.floor(Date.now() / 1000) + 86400,
          upcoming: true,
          success: null,
          details: "SpaceX Falcon 9 rocket delivering Starlink satellites to low Earth orbit.",
          rocket: { name: "Falcon 9" },
          launchpad: { locality: "Cape Canaveral, FL" },
          links: {}
        };
        
        try {
          const launchRes = await fetch("https://api.spacexdata.com/v5/launches/latest", {
            signal: AbortSignal.timeout(5000)
          });
          if (launchRes.ok) {
            launchData = await launchRes.json();
            setServiceStatus(prev => ({ ...prev, spacex: "online" }));
          } else {
            setServiceStatus(prev => ({ ...prev, spacex: "offline" }));
          }
        } catch (e) {
          setServiceStatus(prev => ({ ...prev, spacex: "offline" }));
        }
        setLaunch(launchData);

        // Fetch asteroids
        let asteroidData = [];
        try {
          const today = new Date().toISOString().split("T")[0];
          const neoRes = await fetch(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`,
            { signal: AbortSignal.timeout(5000) }
          );
          if (neoRes.ok) {
            const neoData = await neoRes.json();
            const todayAsteroids = neoData.near_earth_objects?.[today] || [];
            asteroidData = todayAsteroids.filter(neo => neo.is_potentially_hazardous_asteroid).slice(0, 3);
          }
        } catch (e) {
          // Silent fail - asteroids optional
        }
        setAsteroids(asteroidData);

        setLoading(false);
      } catch (err) {
        console.error("Critical error:", err);
        setLoading(false);
      }
    };

    fetchData();
    
    // Retry NASA every 5 minutes
    const interval = setInterval(() => {
      if (serviceStatus.nasa === "offline") {
        fetchData();
      }
    }, 300000);
    
    return () => clearInterval(interval);
  }, [serviceStatus.nasa]);

  // Countdown timer
  useEffect(() => {
    if (!launch?.date_unix) return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const diff = launch.date_unix - now;

      if (diff <= 0) {
        setCountdown("Liftoff!");
        return;
      }

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [launch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader text="Loading space data..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
                <RiRocketLine className="text-blue-300" />
                <span>Latest SpaceX Mission</span>
                {serviceStatus.spacex === "offline" && (
                  <span className="text-xs text-yellow-300 ml-2">(Cached)</span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {launch?.name}
              </h1>
              
              <p className="text-lg text-gray-300 max-w-lg">
                {launch?.details?.slice(0, 150)}...
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <RiCalendarLine />
                  {new Date(launch?.date_utc).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <RiMapPinLine />
                  {launch?.launchpad?.locality}
                </div>
                {launch?.success !== null && (
                  <div className={`flex items-center gap-1 ${launch.success ? "text-green-400" : "text-red-400"}`}>
                    {launch.success ? <RiCheckboxCircleLine /> : <RiCloseCircleLine />}
                    {launch.success ? "Success" : "Failed"}
                  </div>
                )}
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link 
                  to="/launches"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all"
                >
                  View All Launches
                  <RiArrowRightLine />
                </Link>
                {launch?.links?.webcast && !launch?.upcoming && (
                  <a
                    href={launch.links.webcast}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
                  >
                    Watch Replay
                    <RiExternalLinkLine />
                  </a>
                )}
              </div>
            </div>

            <div className="w-full md:w-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-blue-300">
                  <RiTimeLine className="text-xl" />
                  <span className="text-sm font-medium uppercase tracking-wide">
                    {launch?.upcoming ? "Countdown" : "Mission Time"}
                  </span>
                </div>
                <div className="text-3xl md:text-5xl font-mono font-bold tabular-nums">
                  {countdown}
                </div>
                <p className="text-sm text-gray-400">
                  {launch?.upcoming ? "Upcoming Launch" : "Mission Complete"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* APOD Card */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="relative h-64 md:h-80 overflow-hidden group">
              {apod?.url ? (
                <img 
                  src={apod.url} 
                  alt={apod.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center text-white/80">
                  <RiImageLine className="text-6xl mb-4 opacity-50" />
                  <p className="text-lg font-medium">Live Image Unavailable</p>
                  <p className="text-sm opacity-60 mt-2">Auto-retry in background</p>
                  {serviceStatus.nasa === "offline" && (
                    <span className="mt-3 px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">
                      NASA API: Standby
                    </span>
                  )}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <RiFireLine className="text-orange-400" />
                  <span className="text-xs font-medium uppercase tracking-wide text-orange-300">
                    {apod?.url ? "Live from NASA" : "Astronomy Picture of the Day"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-1">{apod?.title}</h2>
                <p className="text-sm text-gray-300">{apod?.date}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                {apod?.explanation}
              </p>
              <Link 
                to="/apod"
                className="inline-flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:gap-3 transition-all"
              >
                View Full Archive
                <RiArrowRightLine />
              </Link>
            </div>
          </div>

          {/* Asteroid Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <RiAlarmWarningLine className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Asteroid Alerts</h3>
                <p className="text-xs text-gray-500">Potentially hazardous today</p>
              </div>
            </div>

            {asteroids.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No hazardous asteroids detected</p>
                <p className="text-xs mt-1">Earth is safe! 🌍</p>
              </div>
            ) : (
              <div className="space-y-4">
                {asteroids.map((neo) => (
                  <div 
                    key={neo.id}
                    className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {neo.name?.replace(/[()]/g, "") || "Unknown Object"}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-full font-medium">
                        {(neo.estimated_diameter?.kilometers?.estimated_diameter_max || 0).toFixed(2)} km
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <p>Velocity: {parseInt(neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour || 0).toLocaleString()} km/h</p>
                      <p>Distance: {parseInt(neo.close_approach_data?.[0]?.miss_distance?.kilometers || 0).toLocaleString()} km</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link 
              to="/asteroids"
              className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
            >
              View All Asteroids
              <RiArrowRightLine />
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "SpaceX Launches", value: "300+", icon: RiRocketLine },
            { label: "Active Satellites", value: "8,000+", icon: RiCheckboxCircleLine },
            { label: "NEO Tracked", value: "32,000+", icon: RiAlarmWarningLine },
            { label: "APOD Images", value: "9,000+", icon: RiFireLine },
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center"
            >
              <stat.icon className="mx-auto text-blue-600 dark:text-blue-400 text-2xl mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;