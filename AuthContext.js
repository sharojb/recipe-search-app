import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch(`/api/login/${username}/${password}`);
      if (response.ok) {
        setUser(username);
        return true;
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
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`/api/register/${username}/${email}/${password}`, {
        method: "GET" // Assuming your registration endpoint uses GET method
      });
      if (response.ok) {
        return true;
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error registering:", error);
      return false;
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const contextValue = {
    user,
    login,
    logout,
    register,
    isAuthenticated
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
