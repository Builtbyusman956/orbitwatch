const Loader = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    <p className="text-gray-500 dark:text-gray-400">{text}</p>
  </div>
);

export default Loader;