const Privacy = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
      <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 space-y-4">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements on our website. Google uses cookies to serve ads based on your prior visits to our website or other websites.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Data Collection</h2>
        <p>
          OrbitWatch uses NASA and SpaceX APIs to display space-related data. We do not collect personal information from our users.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Cookies</h2>
        <p>
          Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
        </p>
      </div>
    </div>
  </div>
);

export default Privacy;