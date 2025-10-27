import React from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '/assets/Vibes_Logo.png'

const LandingPage = () => {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-purple-700 via-purple-500 to-fuchsia-400 text-white text-center px-6">
      <h1 className="text-6xl font-bold mb-6">
        <span className="text-yellow-300">Vibes</span>
      </h1>

      <p className="text-2xl text-white/90 mb-12 max-w-2xl">
        Capture, Connect, and Create: Share your world, see theirs.
      </p>

      <div className="w-48 h-48 mb-12 flex items-center justify-center animate-pulse">
        <img src={logo} alt='Logo_image' />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={() => navigate('/login')} className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Login
        </button>

        <button onClick={() => navigate('/signup')} className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

