import React, { useState } from "react";
import SearchBar from "./SearchBar";

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

  return (
    <header className="header" style={{ backgroundImage: "url('/bg2.jpeg')" }}>
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
        <img src="/logo.png" alt="Logo" className="header-logo" />
      </div>
      <section className="search-section">
        <SearchBar onSearch={onSearch} />
      </section>
      {showLoginForm && (
        <div className="loginContainer">
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
      )}
    </header>
  );
};

export default Header;
