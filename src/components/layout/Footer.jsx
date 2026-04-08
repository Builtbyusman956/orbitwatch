import { Link } from "react-router-dom";
import { RiRocketLine, RiGithubLine, RiTwitterLine, RiLinkedinBoxLine } from "react-icons/ri";

const footerLinks = [
  { path: "/launches", label: "Launches" },
  { path: "/apod", label: "APOD" },
  { path: "/asteroids", label: "Asteroids" },
];

const dataSources = [
  { href: "https://api.nasa.gov", label: "NASA Open APIs" },
  { href: "https://thespacedevs.com", label: "The Space Devs" },
];

const socialLinks = [
  { href: "https://github.com", icon: RiGithubLine, label: "GitHub" },
  { href: "https://twitter.com", icon: RiTwitterLine, label: "Twitter" },
  { href: "https://linkedin.com", icon: RiLinkedinBoxLine, label: "LinkedIn" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-lg group w-fit">
              <span className="transition-transform duration-200 group-hover:rotate-12">
                <RiRocketLine size={22} />
              </span>
              <span>Orbit<span className="text-gray-900 dark:text-white">Watch</span></span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Real-time space tracking powered by NASA and SpaceDevs APIs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
              Data Sources
            </h3>
            <ul className="space-y-3">
              {dataSources.map(({ href, label }) => (
                <li key={href}>
                  <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {currentYear} OrbitWatch. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;