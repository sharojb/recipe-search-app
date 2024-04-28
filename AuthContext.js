import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = async (mail, password) => {
    try {
      const response = await fetch(`http://localhost:5000/api/login/${mail}/${password}`);
      if (response.ok) {
      const data = await response.json();
        // const data = response.json()

      setUser(data.user);
      setUserName(data.user.username);

        return data;
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserName(null);
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(
        `https:localhost:5000/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username, mail:email, password }) 
        },
      );
      if (response.ok) {
        return true;
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const contextValue = {
    user: user || {}, 
    userName,
    login,
    logout,
    register,
    isAuthenticated,
    registerUser: register, 
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};