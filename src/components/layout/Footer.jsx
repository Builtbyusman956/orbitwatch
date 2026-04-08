import { Link } from "react-router-dom";
import { RiRocketLine, RiGithubLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";

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
  { href: "https://github.com/Builtbyusman956", icon: RiGithubLine, label: "GitHub" },
  { href: "https://www.linkedin.com/in/usman-akangbe-b347423b4/", icon: FaLinkedin, label: "Linkedln" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-lg group w-fit">
              <span className="transition-transform duration-200 group-hover:rotate-12">
                <RiRocketLine size={22} />
              </span>
              <span>Orbit<span className="text-gray-900 dark:text-white">Watch</span></span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Real-time space tracking powered by NASA and SpaceDevs APIs. Stay updated on launches, asteroids, and daily space imagery.
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
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 h-px bg-blue-600 transition-all duration-200 group-hover:w-3" />
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
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 h-px bg-blue-600 transition-all duration-200 group-hover:w-3" />
                    {label}
                    <svg className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {currentYear} OrbitWatch. Built with React 
          </p>
          
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
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