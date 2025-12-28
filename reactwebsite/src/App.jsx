import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import DiscoverPeoplePage from "./pages/DiscoverPeoplePage";

const App = () => {
  const [isLogin, setisLogin] = useState(false);

  return (
    <Router>
      {isLogin && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage setisLogin={setisLogin} />} />
        <Route path="/register" element={<RegisterPage setisLogin={setisLogin} />} />
        <Route path="/home" element={isLogin ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/post/:id" element={isLogin ? <PostPage /> : <Navigate to="/login" />} />
        <Route path="/profile/:username" element={isLogin ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/discover" element={isLogin ? <DiscoverPeoplePage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
