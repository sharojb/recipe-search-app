import Link from "next/link";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useAuth } from "../AuthContext";
import FavoritesList from "./FavoritesList";
import styles from "../styles/favorites.module.css";

const Header = ({ onSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { user, login } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [userName, setName] = useState("");
  const [recipes, setRecipes] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUsername(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);


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
      const data_response = await login(email, password);
      setIsLoggedIn(true);
      console.log(data_response);
      console.log(data_response.user.username);
      console.log(data_response.user.mail);
      setName(data_response.user.username);
      setEmail(data_response.user.mail);
      setUsername(data_response.user.username);
      localStorage.setItem("user", data_response.user.username);
      setIsLoggedIn(true);
      setShowLoginForm(false);
    } catch (error) {
      console.error("Error registering user:", error);
      console.log({ message: "Failed to register user" });
    }
  };

  const handleLogout = () => {
    // logout(); 
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("user"); 
  };

  const handleFavoritesClick = async () => {
    console.log("handleFavoritesClick called");
    try {
      if (!isLoggedIn) {
        setShowFavorites(true);
        return;
      }

      const username = user.username;
      const response = await fetch(
        `http://186.137.239.210:5000/api/user/favorites/${user.username}`,
      );
  
      if (response.ok) {
        const favorites = await response.json();
        console.log("User Favorites:", favorites);
        setRecipes(favorites.userFavorites);
        setName(user.username);
        setShowFavorites((setShowFavorites) => !setShowFavorites);
      } else {
        console.error("Failed to fetch user favorites:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
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
            <button onClick={handleFavoritesClick} className="button-ind">
              {showFavorites ? "Hide Favorites" : "My Favorites"}
            </button>

            {!isLoggedIn && showFavorites &&(
              <p className="message">Please Log In to set Favorites</p>
            )}
            {isLoggedIn && showFavorites && <FavoritesList username={userName} />}

          </div>
      </div>
      {/* <div className="logo-container">
        <Link href="https://ucook.vercel.app/">
          <img src="/logo.png" alt="Logo" className="header-logo" />
        </Link>
      </div> */}

          <div className="logo-container">
          <Link href="/">
              <span onClick={handleLogoClick}>
                <img src="/logo.png" alt="Logo" className="header-logo" />
              </span>
            </Link>
          </div>
      <section className="search-section">
        <SearchBar onSearch={onSearch} />
      </section>
      {isLoggedIn && (
        <p>
          <strong>You are logged in as <span className="userName">{userName}</span>. Let's get <span className="userName">ucookin'</span></strong>
        </p>
      )}

      {showLoginForm && (
        <div className="login-modal">
          <div className="login-container">
            <form onSubmit={handleSubmit}>
              <label className="login">Email:</label>
              <input
                className="inputLogin"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="login">Password:</label>
              <input
                className="inputLogin"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
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
