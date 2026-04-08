import { useState, useEffect } from "react";
import { useAPODRange } from "../hooks/useNASA";
import { formatDate } from "../utils/formatDate";
import { 
  RiFireLine, 
  RiCalendarLine, 
  RiArrowRightLine,
  RiFullscreenLine
} from "react-icons/ri";
import Loader from "../components/ui/Loader";

const APOD = () => {
  const [selected, setSelected] = useState(null);
  const [offset, setOffset] = useState(0);
  
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - offset);
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 11);

  const format = (d) => d.toISOString().split("T")[0];
  const { data: images, loading } = useAPODRange(format(startDate), format(endDate));

  useEffect(() => {
    if (images.length > 0 && !selected) {
      setSelected(images[0]);
    }
  }, [images, selected]);

  const loadMore = () => setOffset(prev => prev + 12);

  if (loading && images.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader text="Loading space imagery..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <RiFireLine className="text-orange-500" />
            Astronomy Picture of the Day
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Discover the cosmos through NASA's daily curated images
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Featured Image */}
        {selected && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
            <div className="relative aspect-video bg-black group">
              {selected.media_type === "image" ? (
                <img 
                  src={selected.hdurl || selected.url} 
                  alt={selected.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={selected.url}
                  title={selected.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              )}
              
              <button
                onClick={() => window.open(selected.hdurl || selected.url, "_blank")}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-colors"
              >
                <RiFullscreenLine size={20} />
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <RiCalendarLine />
                {selected.date}
                {selected.copyright && <span className="ml-2">© {selected.copyright}</span>}
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selected.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {selected.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          Recent Archive
          <span className="text-sm font-normal text-gray-500">({images.length} images)</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <button
              key={img.date}
              onClick={() => setSelected(img)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                selected?.date === img.date
                  ? "border-blue-600 ring-2 ring-blue-600/20"
                  : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {img.media_type === "image" ? (
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <span className="text-white text-xs">Video</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                  <p className="text-white text-xs font-medium line-clamp-2">{img.title}</p>
                  <p className="text-white/70 text-xs mt-1">{img.date}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors inline-flex items-center gap-2"
          >
            {loading ? "Loading..." : <>Load More <RiArrowRightLine /></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default APOD;