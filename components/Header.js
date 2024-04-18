import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link"; // Import Link from Next.js

const Header = ({ onSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

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
    onSearch([""]); // Reset the search bar
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
          <button className="button-ind" onClick={toggleLoginForm}>
            Log In
          </button>
        </div>
      </div>
      <div className="logo-container">
        {/* Wrap the logo with Link from Next.js */}
        <Link href="/" onClick={handleLogoClick}>
          <img src="/logo.png" alt="Logo" className="header-logo" />
        </Link>
      </div>
      <section className="search-section">
        <SearchBar onSearch={onSearch} />
      </section>
      {showLoginForm && (
        <div className="login-modal">
          <div className="login-container">
            <form>
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
