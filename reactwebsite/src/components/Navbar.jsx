import React, {useState} from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/home", label: "🏠 Home" },
    { to: "/discover", label: "🔍 Discover" },
    { to: "/profile/ruchita_123", label: "👤 Profile" },
  ];

  return (
    <nav className="bg-[linear-gradient(to_right,#C04CFD,#FC6DAB)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <NavLink to="/home" className="text-2xl font-bold bg-clip-text text-transparent gradient-bg">
          Vibes
        </NavLink>

        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) =>`p-2 rounded-lg transition-colors ${isActive ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:text-purple-600"}`}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button className="md:hidden text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)} className={({ isActive }) =>`block p-2 rounded-lg transition-colors ${isActive ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:text-purple-600"}`}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


