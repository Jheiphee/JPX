import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black bg-opacity-80 backdrop-blur-md shadow-lg fixed top-0 w-full z-50">
      <div className="flex justify-between items-center px-6 md:px-28 py-4">
        
        {/* Logo + Title + Tagline */}
        <div className="flex flex-col items-start space-y-1">
          <div className="flex items-center space-x-3">
            <img
              src="/JPX%20LOGO.jpg"
              alt="JPX Logo"
              className="w-14 h-14 object-contain"
            />
            <h1 className="text-4xl font-bold text-metallicgold font-serif uppercase tracking-wider">
              JPX
            </h1>
          </div>
          <p className="text-sm text-gray-400 ml-[3.5rem] -mt-1">
            One Brand, Many Roles
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 md:space-x-10 text-lg font-medium">
          {[
            { label: "Home", to: "/" },
            { label: "Who is JP?", to: "/whoisjp" },
            { label: "View My Work", to: "/view-my-work" },
            { label: "Services", to: "/services" },
            { label: "Contact Me", to: "/contact" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold"
                    : "text-white hover:text-yellow-400 transition"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
