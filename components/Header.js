import React, { useState } from 'react';
import SearchBar from './SearchBar';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header" style={{ backgroundImage: "url('/bg1.png')" }}>
      <div className="header-buttons">
        <button className="button">About</button>
        <button className="button">Contact</button>
      </div>
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="header-logo" />
      </div>
      <div className="hamburger-menu">
        <div className="hamburger-menu-icon" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {showMenu && (
          <div className="hamburger-menu-content">
            <button className="button">About</button>
            <button className="button">Contact</button>
          </div>
        )}
      </div>
      <SearchBar />
      <button className="cookNowButton">Cook Now</button>
    </header>
  );
};

export default Header;
