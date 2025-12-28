import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import API from "../api/auth";
import { UserContext } from "../context/UserContext";
import { validateEmail, validatePassword } from "../components/validation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = "Invalid email";
    if (!validatePassword(password)) newErrors.password = "Password must be 8+ chars";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/login", { email, password });
      const token = res.data?.token;
      if (!token) throw new Error("Login failed: no token returned");

      Cookies.set("token", token, { expires: 1 });

      const userData = res.data?.user;
      if (!userData) throw new Error("Login failed: user data missing");

      setUser(userData);
      navigate("/home");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || err.message || "Login failed";
      setErrors({ api: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-700 via-purple-500 to-fuchsia-400 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}/>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-purple-600 to-fuchsia-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate("/register")} className="text-purple-600 hover:underline font-semibold">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

