import { Link, useLocation } from "react-router-dom";
import { 
  RiRocketLine, 
  RiPlanetLine, 
  RiMeteorLine, 
  RiMenuLine, 
  RiCloseLine,
  RiHome2Line
} from "react-icons/ri";
import { useState } from "react";

const navLinks = [
  { path: "/", label: "Home", icon: RiHome2Line },
  { path: "/launches", label: "Launches", icon: RiRocketLine },
  { path: "/apod", label: "APOD", icon: RiPlanetLine },
  { path: "/asteroids", label: "Asteroids", icon: RiMeteorLine },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
        <RiRocketLine className="text-2xl" />
        <span>Orbit<span className="text-gray-900 dark:text-white">Watch</span></span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-1">
        {navLinks.map(({ path, label, icon: Icon }) => (
          <li key={path}>
            <Link
              to={path}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${pathname === path
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400"}
              `}
            >
              <Icon size={18} /> {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Button */}
      <button
        className="md:hidden text-gray-500 text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex flex-col px-6 py-4 gap-2 md:hidden shadow-lg animate-fade-in-down">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-2 pb-3 border-b border-gray-100 dark:border-gray-800">
            <RiRocketLine className="text-xl" />
            <span>Orbit<span className="text-gray-900 dark:text-white">Watch</span></span>
          </div>
          
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${pathname === path
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"}
                  `}
                >
                  <Icon size={18} /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;