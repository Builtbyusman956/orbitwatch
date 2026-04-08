const Terms = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
      <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 space-y-4">
        <p>By using OrbitWatch, you agree to these terms.</p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Use of Data</h2>
        <p>
          All space data is provided by NASA and SpaceX public APIs. We make no guarantees about accuracy or availability.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Advertisements</h2>
        <p>
          This website displays advertisements through Google AdSense to support development and server costs.
        </p>
      </div>
    </div>
  </div>
);

export default Terms;