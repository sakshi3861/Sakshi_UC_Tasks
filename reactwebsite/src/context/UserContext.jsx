import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token"); 
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "https://task4-authdb.onrender.com/api/auth/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data && res.data.user) {
          setUser(res.data.user); 
        } else {
          setUser(res.data); 
        }
      } catch (err) {
        console.error(
          "Failed to fetch user:",
          err.response?.data || err.message
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

