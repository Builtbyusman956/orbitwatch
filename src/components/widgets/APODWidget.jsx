import { Link } from "react-router-dom";
import { RiFireLine, RiArrowRightLine } from "react-icons/ri";

const APODWidget = ({ apod }) => {
  if (!apod) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={apod.url} 
          alt={apod.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <RiFireLine className="text-orange-400" />
            <span className="text-xs font-medium uppercase">APOD</span>
          </div>
          <h3 className="font-bold line-clamp-1">{apod.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {apod.explanation}
        </p>
        <Link 
          to="/apod"
          className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 font-medium hover:gap-2 transition-all"
        >
          View Archive <RiArrowRightLine />
        </Link>
      </div>
    </div>
  );
};

export default APODWidget;