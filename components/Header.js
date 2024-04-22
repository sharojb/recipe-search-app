import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useAuth } from "../AuthContext";
import FavoritesList from "./FavoritesList";
import styles from "../styles/create.module.css";


const Header = ({ onSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { user } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  console.log("User Object:", user);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const scrollToAbout = () => {
    document
      .querySelector(".body-content")
      .scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document
      .querySelector(".footer-text")
      .scrollIntoView({ behavior: "smooth" });
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleLogoClick = () => {
    onSearch([""]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password", password);
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        // If the login is successful, retrieve user data from the response
        const userData = await response.json();
        console.log('User data:', userData);
        // Update the user context with the retrieved data
        // For example, setUser(userData);
        setIsLoggedIn(true);
        setShowLoginForm(false);
      } else {
        // If login fails, handle error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="header" style={{ backgroundImage: "url('/bg1.png')" }}>
      <div>
        <label className="hamburger-menu" onClick={toggleMenu}>
          &#9776;
        </label>
        <div
          className={`header-buttons ${
            showMenu ? "header-buttons-active" : ""
          }`}
          id="hamburger-buttons"
        >
          <button className="button-ind" onClick={scrollToAbout}>
            About
          </button>
          <button className="button-ind" onClick={scrollToContact}>
            Contact
          </button>
          <button className="button-ind" onClick={toggleLoginForm}>
            Log In
          </button>
          {isLoggedIn && (
            <button className="button-ind" onClick={handleLogout}>
              Log Out
            </button>
          )}
        </div>
      </div>
      <div className="logo-container">
        <Link href="https://ucook.vercel.app/">
          <img src="/logo.png" alt="Logo" className="header-logo" onCLick={handleLogoClick}/>
        </Link>
      </div>
      <section className="search-section">
        <SearchBar onSearch={onSearch} />
      </section>
      {isLoggedIn && (
        <p className={styles.return}>
         You are logged in as <strong >{user && user.userName}</strong>
        </p>
      )}

      {showLoginForm && (
        <div className="login-modal">
          <div className="login-container">
            <form onSubmit={handleSubmit}>
              <label className="login">Email:</label>
              <input className="inputLogin" type="email" value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
              <label className="login">Password:</label>
              <input className="inputLogin" type="password" value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
              <button className="loginSubmit" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
       {isLoggedIn && <FavoritesList username={user && user.userName} />}
    </header>
  );
};

export default Header;
