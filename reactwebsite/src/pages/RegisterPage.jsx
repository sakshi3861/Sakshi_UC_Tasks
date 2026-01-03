// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import API from "../api/auth";
// import { UserContext } from "../context/UserContext";
// import { validateEmail, validatePassword, validateUsername } from "../components/validation";

// const RegisterPage = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const { setUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});

//     const newErrors = {};
//     if (!validateEmail(email)) newErrors.email = "Invalid email";
//     if (!validateUsername(username)) newErrors.username = "Username must be 3-15 characters";
//     if (!validatePassword(password)) newErrors.password = "Password must be 8+ chars";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);
//     try {
//       await API.post("/register", {
//         name: username, 
//         email,
//         password,
//       });

//       const loginRes = await API.post("/login", { email, password });
//       const token = loginRes.data?.token;
//       if (!token) throw new Error("Login after registration failed: no token returned");

//       Cookies.set("token", token, { expires: 1 });

//       const userData = loginRes.data?.user;
//       if (!userData) throw new Error("Login after registration failed: user data missing");
//       setUser(userData);

//       navigate("/home");
//     } catch (err) {
//       console.error(err);
//       const message = err.response?.data?.message || err.message || "Registration failed";
//       setErrors({ api: message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-purple-700 via-purple-500 to-fuchsia-400">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
//         <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-fuchsia-500">
//           Create Account
//         </h2>
//         <p className="text-gray-600 text-center mb-6">Sign up with username, email, and password</p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

//           <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.username ? "border-red-500" : "border-gray-300"}`}/>
//           {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}/>
//           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

//           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}/>
//           {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

//           <button type="submit" disabled={loading} className="w-full bg-linear-to-r from-purple-600 to-fuchsia-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600">
//           Already have an account?{" "}
//           <button type="button" onClick={() => navigate("/login")} className="text-purple-600 hover:underline font-semibold">
//             Log in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { registerUser, loginUser } from "../api/auth"; // ✅ use named imports
import { UserContext } from "../context/UserContext";
import { validateEmail, validatePassword, validateUsername } from "../components/validation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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
    if (!validateUsername(username)) newErrors.username = "Username must be 3-15 characters";
    if (!validatePassword(password)) newErrors.password = "Password must be 8+ chars";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Register user
      await registerUser({
        name: username,
        email,
        password,
      });

      // 2️⃣ Log in right after registration
      const loginRes = await loginUser({ email, password });
      const token = loginRes.token;
      if (!token) throw new Error("Login after registration failed: no token returned");

      Cookies.set("token", token, { expires: 1 });

      const userData = loginRes.user;
      if (!userData) throw new Error("Login after registration failed: user data missing");
      setUser(userData);

      navigate("/home");
    } catch (err) {
      console.error(err);
      const message = err.message || "Registration failed";
      setErrors({ api: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-purple-700 via-purple-500 to-fuchsia-400">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-fuchsia-500">
          Create Account
        </h2>
        <p className="text-gray-600 text-center mb-6">Sign up with username, email, and password</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.api && <p className="text-red-500 text-sm text-center">{errors.api}</p>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-purple-600 to-fuchsia-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-purple-600 hover:underline font-semibold"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;


