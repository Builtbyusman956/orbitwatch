import { useAPOD, useNEO } from "../hooks/useNASA";
import { useLatestLaunch } from "../hooks/useLaunches";
import { useCountdown } from "../hooks/useCountdown";
import { formatDate } from "../utils/formatDate";
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
  RiAlarmWarningLine
} from "react-icons/ri";
import Loader from "../components/ui/Loader";

const Home = () => {
  const { data: apod, loading: apodLoading } = useAPOD();
  const { launch, loading: launchLoading } = useLatestLaunch();
  const { data: asteroids, loading: neoLoading } = useNEO(1); // Just today
  const { countdown } = useCountdown(launch?.date_unix);

  const hazardousAsteroids = asteroids
    .filter((neo) => neo.is_potentially_hazardous_asteroid)
    .slice(0, 3);

  const isLoading = apodLoading || launchLoading || neoLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader text="Loading space data..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      
      {/* Hero Section - Featured Launch */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Launch Info */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
                <RiRocketLine className="text-blue-300" />
                <span>Latest SpaceX Mission</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {launch?.name || "Mission Update"}
              </h1>
              
              <p className="text-lg text-gray-300 max-w-lg">
                {launch?.details?.slice(0, 150) || "Stay updated with the latest space exploration missions."}...
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <RiCalendarLine />
                  {launch?.date_utc ? formatDate(launch.date_utc) : "TBD"}
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <RiMapPinLine />
                  {launch?.launchpad?.locality || "Unknown"}
                </div>
                {launch?.success !== null && (
                  <div className={`flex items-center gap-1 ${launch.success ? "text-green-400" : "text-red-400"}`}>
                    {launch.success ? <RiCheckboxCircleLine /> : <RiCloseCircleLine />}
                    {launch.success ? "Success" : "Failed"}
                  </div>
                )}
              </div>

              <Link 
                to="/launches"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all hover:gap-3"
              >
                View All Launches
                <RiArrowRightLine />
              </Link>
            </div>

            {/* Countdown Card */}
            <div className="w-full md:w-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-blue-300">
                  <RiTimeLine className="text-xl" />
                  <span className="text-sm font-medium uppercase tracking-wide">Mission Time</span>
                </div>
                
                <div className="text-3xl md:text-5xl font-mono font-bold tabular-nums">
                  {countdown || "T-minus..."}
                </div>
                
                <p className="text-sm text-gray-400">
                  {launch?.upcoming ? "Upcoming Launch" : "Mission Complete"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* NASA APOD Card - Spans 2 columns */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="relative h-64 md:h-80 overflow-hidden group">
              <img 
                src={apod?.url} 
                alt={apod?.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <RiFireLine className="text-orange-400" />
                  <span className="text-xs font-medium uppercase tracking-wide text-orange-300">
                    Astronomy Picture of the Day
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
                View Full Size & History
                <RiArrowRightLine />
              </Link>
            </div>
          </div>

          {/* Asteroid Alerts Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <RiAlarmWarningLine className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Asteroid Alerts</h3>
                <p className="text-xs text-gray-500">Potentially hazardous objects today</p>
              </div>
            </div>

            {hazardousAsteroids.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No hazardous asteroids detected today</p>
                <p className="text-xs mt-1">Earth is safe! 🌍</p>
              </div>
            ) : (
              <div className="space-y-4">
                {hazardousAsteroids.map((neo) => (
                  <div 
                    key={neo.id}
                    className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {neo.name.replace("(", "").replace(")", "")}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-full font-medium">
                        {(neo.estimated_diameter.kilometers.estimated_diameter_max).toFixed(2)} km
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <p>Velocity: {parseInt(neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour).toLocaleString()} km/h</p>
                      <p>Distance: {parseInt(neo.close_approach_data[0]?.miss_distance.kilometers).toLocaleString()} km</p>
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

        {/* Quick Stats Row */}
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