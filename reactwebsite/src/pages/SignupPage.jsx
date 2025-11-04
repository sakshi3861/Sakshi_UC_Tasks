import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {validateEmail,validatePassword,validateUsername} from "../components/validation";

const SignupPage = ({ setisLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) newErrors.email = "Please enter a valid email address";
    if (!validateUsername(username)) newErrors.username = "Username must be 3-15 characters (letters, numbers, or underscores only)";
    if (!validatePassword(password)) newErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setisLogin(true);
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-purple-700 via-purple-500 to-fuchsia-400">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 fade-in">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600 text-xl mt-2">Share your vibes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"}`}/>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.username ? "border-red-500" : "border-gray-300"}`}/>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"}`}/>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full bg-linear-to-r from-purple-600 to-fuchsia-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button onClick={() => navigate("/login")} className="text-purple-600 hover:underline font-semibold">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;


