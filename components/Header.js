import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useAuth } from "../AuthContext"; 

const Header = ({ onSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { userName } = useAuth(); // Retrieve userName from useAuth hook
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for managing logged-in status

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

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log("Form submitted!");
    setIsLoggedIn(true);
    setShowLoginForm(false);
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
          className={`header-buttons ${showMenu ? "header-buttons-active" : ""}`}
          id="hamburger-buttons"
        >
          <button className="button-ind" onClick={scrollToAbout}>
            About
          </button>
          <button className="button-ind" onClick={scrollToContact}>
            Contact
          </button>
          {/* Conditionally render login/logout button based on isLoggedIn state */}
          {isLoggedIn ? (
            <button className="button-ind" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <button className="button-ind" onClick={toggleLoginForm}>
              Log In
            </button>
          )}
        </div>
      </div>
      <div className="logo-container">
        <Link href="https://ucook.vercel.app/">
          <img src="/logo.png" alt="Logo" className="header-logo" />
        </Link>
      </div>
      <section className="search-section">
        <SearchBar onSearch={onSearch} />
      </section>
      {isLoggedIn && (
        <p>
          You are logged in as <strong>{userName}</strong>
        </p>
      )}

      {showLoginForm && (
        <div className="login-modal">
          <div className="login-container">
            <form onSubmit={handleSubmit}>
              <label className="login">Email:</label>
              <input className="inputLogin" type="email" />
              <label className="login">Password:</label>
              <input className="inputLogin" type="password" />
              <button className="loginSubmit" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
