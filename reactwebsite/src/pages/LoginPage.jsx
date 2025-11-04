import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {validateEmail,validatePassword} from "../components/validation";

const LoginPage = ({ setisLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) 
      newErrors.email = "Please enter a valid email address";
    if (!validatePassword(password)) 
      newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol";

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
          <h2 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"}`}/>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"}`}/>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full bg-linear-to-r from-purple-600 to-fuchsia-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button onClick={() => navigate("/signup")} className="text-purple-600 hover:underline font-semibold">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



