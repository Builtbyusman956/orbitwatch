import { useState } from "react";
import { useNEO } from "../hooks/useNASA";
import { formatDate, formatDistance, formatVelocity } from "../utils/formatDate";
import { 
  RiAlarmWarningLine, 
  RiSpeedLine, 
  RiRulerLine, 
  RiTimeLine,
  RiFilterLine,
  RiAlertLine
} from "react-icons/ri";
import Loader from "../components/ui/Loader";
import Badge from "../components/ui/Badge";

const Asteroids = () => {
  const [dateRange, setDateRange] = useState("7");
  const [hazardousOnly, setHazardousOnly] = useState(false);
  
  const { data: asteroids, loading } = useNEO(parseInt(dateRange));
  
  const filtered = hazardousOnly 
    ? asteroids.filter(a => a.is_potentially_hazardous_asteroid)
    : asteroids;

  const hazardousCount = asteroids.filter(a => a.is_potentially_hazardous_asteroid).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader text="Scanning near-Earth objects..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Alert Banner */}
      {hazardousCount > 0 && (
        <div className="bg-red-600 text-white px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <RiAlertLine className="text-xl flex-shrink-0" />
            <p className="text-sm font-medium">
              {hazardousCount} potentially hazardous asteroid{hazardousCount > 1 ? 's' : ''} detected
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <RiAlarmWarningLine className="text-orange-500" />
                Asteroid Tracker
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Monitor near-Earth objects approaching our planet
              </p>
            </div>

            <div className="flex gap-3">
              <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-700 dark:text-blue-400">{asteroids.length}</div>
                <div className="text-xs text-gray-500">Total Tracked</div>
              </div>
              <div className={`px-4 py-2 rounded-lg text-center ${hazardousCount > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
                <div className={`text-xl font-bold ${hazardousCount > 0 ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                  {hazardousCount}
                </div>
                <div className="text-xs text-gray-500">Hazardous</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              <option value="3">Next 3 days</option>
              <option value="7">Next 7 days</option>
              <option value="14">Next 14 days</option>
            </select>

            <button
              onClick={() => setHazardousOnly(!hazardousOnly)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                hazardousOnly
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              <RiFilterLine size={16} />
              {hazardousOnly ? "Hazardous Only" : "Show All"}
            </button>
          </div>
        </div>
      </div>

      {/* Asteroids List */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {filtered.map((neo) => {
            const approach = neo.close_approach_data[0];
            const diameter = neo.estimated_diameter.kilometers;
            
            return (
              <div 
                key={neo.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all ${
                  neo.is_potentially_hazardous_asteroid
                    ? "border-red-200 dark:border-red-800"
                    : "border-gray-100 dark:border-gray-700"
                } shadow-sm hover:shadow-md`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {neo.name.replace("(", "").replace(")", "")}
                      </h3>
                      {neo.is_potentially_hazardous_asteroid ? (
                        <Badge variant="error" icon={RiAlarmWarningLine}>Hazardous</Badge>
                      ) : (
                        <Badge variant="success">Safe</Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <RiRulerLine size={14} />
                        {((diameter.estimated_diameter_min + diameter.estimated_diameter_max) / 2).toFixed(2)} km
                      </span>
                      <span className="flex items-center gap-1">
                        <RiSpeedLine size={14} />
                        {formatVelocity(approach.relative_velocity.kilometers_per_hour)}
                      </span>
                      <span className="flex items-center gap-1">
                        <RiTimeLine size={14} />
                        {formatDate(approach.epoch_date_close_approach)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatDistance(parseInt(approach.miss_distance.kilometers))}
                    </div>
                    <div className="text-xs text-gray-500">Miss Distance</div>
                  </div>
                </div>

                {/* Distance bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Earth</span>
                    <span>Moon Distance</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${neo.is_potentially_hazardous_asteroid ? "bg-red-500" : "bg-blue-500"}`}
                      style={{ width: `${Math.min((parseInt(approach.miss_distance.kilometers) / 384400) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <RiAlarmWarningLine className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No asteroids found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Asteroids;