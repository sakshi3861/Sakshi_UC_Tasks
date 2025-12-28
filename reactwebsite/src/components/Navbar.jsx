import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user: loggedInUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-[linear-gradient(to_right,#C04CFD,#FC6DAB)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <NavLink to="/home" className="text-5xl font-bold text-yellow-300 flex items-center justify-center leading-none">
          Vibes
        </NavLink>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/home" className={({ isActive }) =>`p-2 rounded-lg transition-colors ${isActive ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:text-purple-600"}`}>
            Home
          </NavLink>

          <NavLink to="/discover" className={({ isActive }) =>`p-2 rounded-lg transition-colors ${isActive ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:text-purple-600"}`}>
            Discover
          </NavLink>

          {loggedInUser && (
            <NavLink to="/profile" className={({ isActive }) =>`p-2 rounded-lg transition-colors ${isActive ? "bg-purple-100 text-purple-600" : "text-gray-600 hover:text-purple-600"}`}>
              Profile
            </NavLink>
          )}

          {loggedInUser && (
            <button onClick={logout} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Logout
            </button>
          )}
        </div>

        <button className="md:hidden text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {isOpen && loggedInUser && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink to="/home" className="block p-2 rounded-lg text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/discover" className="block p-2 rounded-lg text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(false)}>
            Discover
          </NavLink>
          <NavLink to="/profile" className="block p-2 rounded-lg text-gray-600 hover:text-purple-600" onClick={() => setIsOpen(false)}>
            Profile
          </NavLink>
          <button onClick={() => {logout();setIsOpen(false);}}className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


