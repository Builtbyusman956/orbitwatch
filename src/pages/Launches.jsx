import { useState, useEffect } from "react";
import { useLaunches } from "../hooks/useLaunches";
import { formatDate } from "../utils/formatDate";
import { 
  RiRocketLine, 
  RiCalendarLine, 
  RiMapPinLine, 
  RiCheckboxCircleLine, 
  RiCloseCircleLine,
  RiTimeLine,
  RiSearchLine,
  RiExternalLinkLine,
  RiImageLine
} from "react-icons/ri";
import Loader from "../components/ui/Loader";
import Badge from "../components/ui/Badge";

// Rocket type images as fallbacks
const rocketImages = {
  "Falcon 1": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Falcon_1_Flight_4_liftoff.jpg/440px-Falcon_1_Flight_4_liftoff.jpg",
  "Falcon 9": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Falcon_9_flight_10_liftoff.jpg/440px-Falcon_9_flight_10_liftoff.jpg",
  "Falcon Heavy": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Falcon_Heavy_Demo_Mission_%2826580307718%29.jpg/440px-Falcon_Heavy_Demo_Mission_%2826580307718%29.jpg",
  "Starship": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Starship_SN8_launch.jpg/440px-Starship_SN8_launch.jpg"
};

const getRocketImage = (rocketName) => {
  if (!rocketName) return null;
  for (const [key, url] of Object.entries(rocketImages)) {
    if (rocketName.includes(key)) return url;
  }
  return null;
};

const Launches = () => {
  const { launches, loading } = useLaunches(30);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let result = [...launches];

    if (filter === "upcoming") result = result.filter(l => l.upcoming);
    else if (filter === "past") result = result.filter(l => !l.upcoming);
    else if (filter === "success") result = result.filter(l => l.success === true);
    else if (filter === "failed") result = result.filter(l => l.success === false);

    if (search) {
      result = result.filter(l => 
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.rocket?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [filter, search, launches]);

  const getStatusBadge = (launch) => {
    if (launch.upcoming) return <Badge variant="info" icon={RiTimeLine}>Upcoming</Badge>;
    if (launch.success) return <Badge variant="success" icon={RiCheckboxCircleLine}>Success</Badge>;
    return <Badge variant="error" icon={RiCloseCircleLine}>Failed</Badge>;
  };

  const getImageUrl = (launch) => {
    // Try patch first
    if (launch.links?.patch?.large) {
      return launch.links.patch.large;
    }
    if (launch.links?.patch?.small) {
      return launch.links.patch.small;
    }
    // Fallback to rocket type image
    return getRocketImage(launch.rocket?.name);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader text="Loading launches..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <RiRocketLine className="text-blue-600" />
                SpaceX Launches
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Track every SpaceX mission from Falcon 1 to Starship
              </p>
            </div>
            
            <div className="flex gap-4 text-sm">
              <div className="text-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="font-bold text-gray-900 dark:text-white">
                  {launches.filter(l => l.upcoming).length}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">Upcoming</div>
              </div>
              <div className="text-center px-4 py-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <div className="font-bold text-green-700 dark:text-green-400">
                  {launches.filter(l => l.success).length}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">Success</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="relative flex-1">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search missions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {["all", "upcoming", "past", "success", "failed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === f
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Launches Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((launch) => {
            const imageUrl = getImageUrl(launch);
            
            return (
              <div 
                key={launch.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image Container */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-6 relative overflow-hidden">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={launch.name}
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`absolute inset-0 flex flex-col items-center justify-center text-gray-400 ${imageUrl ? 'hidden' : 'flex'}`}
                  >
                    <RiImageLine className="text-5xl mb-2 opacity-50" />
                    <span className="text-xs">No Image Available</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                      {launch.name}
                    </h3>
                    {getStatusBadge(launch)}
                  </div>

                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <RiCalendarLine size={14} />
                      {formatDate(launch.date_utc)}
                    </div>
                    <div className="flex items-center gap-2">
                      <RiMapPinLine size={14} />
                      {launch.launchpad?.locality || "Unknown Location"}
                    </div>
                    <div className="flex items-center gap-2">
                      <RiRocketLine size={14} />
                      {launch.rocket?.name || "Unknown Rocket"}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                    {launch.details || "No mission details available."}
                  </p>

                  {launch.links?.webcast && (
                    <a
                      href={launch.links.webcast}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Watch Launch
                      <RiExternalLinkLine size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <RiRocketLine className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No launches found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Launches;