import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useAuth } from "../AuthContext"; 
import FavoritesList from "./FavoritesList"; 

const Header = ({ onSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { userName } = useAuth(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setName] = useState("");
  const [data, setResponseData] = useState("");
  const { login } = useAuth(); 

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
      const data_response = await login( email, password);
      setResponseData(data_response);
      console.log(data_response)
      console.log(data_response.user.username)
      console.log(data_response.user.mail)
      setName(data_response.user.username);
      setEmail(data_response.user.mail);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error registering user:", error);
      setResponseData({ message: "Failed to register user" });
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
          className={`header-buttons ${showMenu ? "header-buttons-active" : ""}`}
          id="hamburger-buttons"
        >
          <button className="button-ind" onClick={scrollToAbout}>
            About
          </button>
          <button className="button-ind" onClick={scrollToContact}>
            Contact
          </button>
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
          <>
            <p>
              You are logged in as <strong>{username}</strong>
            </p>
            <FavoritesList username={username} />
        </>
      )}

      {showLoginForm && (
        <div className="login-modal">
          <div className="login-container">
            <form onSubmit={handleSubmit}>
              <label className="login" >Email:</label>
              <input className="inputLogin" type="email" onChange={(e) => setEmail(e.target.value)}/>
              <label className="login">Password:</label>
              <input className="inputLogin" type="password" onChange={(e) => setPassword(e.target.value)}/>
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