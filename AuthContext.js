import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch(`/api/login/${username}/${password}`);
      if (response.ok) {
        setUser(username);
        setUserName(username);
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
    setUserName(null);
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json" // Specify content type as JSON
          },
          body: JSON.stringify({ username, mail:email, password }) // Send data in JSON format
        },
      );
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
