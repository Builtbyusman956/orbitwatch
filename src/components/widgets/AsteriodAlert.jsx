import { Link } from "react-router-dom";
import { RiAlarmWarningLine, RiArrowRightLine } from "react-icons/ri";
import Badge from "../ui/Badge";
import { formatDistance } from "../../utils/formatDate";

const AsteroidAlert = ({ asteroids }) => {
  const hazardous = asteroids.filter(a => a.is_potentially_hazardous_asteroid).slice(0, 3);

  if (hazardous.length === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800">
        <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
          <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full">
            <RiAlarmWarningLine />
          </div>
          <div>
            <h3 className="font-bold">All Clear</h3>
            <p className="text-sm">No hazardous asteroids detected</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-red-100 dark:border-red-800 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <RiAlarmWarningLine className="text-red-600 dark:text-red-400 text-xl" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Asteroid Alerts</h3>
          <p className="text-xs text-gray-500">{hazardous.length} hazardous objects</p>
        </div>
      </div>

      <div className="space-y-3">
        {hazardous.map((neo) => (
          <div key={neo.id} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm text-gray-900 dark:text-white">
                {neo.name.replace(/[()]/g, "")}
              </span>
              <Badge variant="error" className="text-xs">
                {(neo.estimated_diameter.kilometers.estimated_diameter_max).toFixed(2)} km
              </Badge>
            </div>
            <p className="text-xs text-gray-500">
              {formatDistance(parseInt(neo.close_approach_data[0].miss_distance.kilometers))} away
            </p>
          </div>
        ))}
      </div>

      <Link 
        to="/asteroids"
        className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
      >
        View All <RiArrowRightLine />
      </Link>
    </div>
  );
};

export default AsteroidAlert;