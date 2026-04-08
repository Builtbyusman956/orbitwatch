import { Link } from "react-router-dom";
import { RiRocketLine, RiCalendarLine, RiMapPinLine } from "react-icons/ri";
import Badge from "../ui/Badge";
import { formatDate } from "../../utils/formatDate";

const LaunchCard = ({ launch, compact = false }) => {
  return (
    <Link 
      to="/launches"
      className="block bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-gray-900 dark:text-white">{launch.name}</h3>
        {launch.upcoming ? (
          <Badge variant="info">Upcoming</Badge>
        ) : launch.success ? (
          <Badge variant="success">Success</Badge>
        ) : (
          <Badge variant="error">Failed</Badge>
        )}
      </div>
      
      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <RiCalendarLine size={14} />
          {formatDate(launch.date_utc)}
        </div>
        {!compact && (
          <div className="flex items-center gap-2">
            <RiMapPinLine size={14} />
            {launch.launchpad?.name || "Unknown"}
          </div>
        )}
      </div>
    </Link>
  );
};

export default LaunchCard;