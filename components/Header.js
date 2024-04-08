import React, { useState } from 'react';
import SearchBar from './SearchBar';

const Header = ({ onSearch }) => { 
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    document.querySelector("#hamburger-buttons").classList.toggle('header-buttons-active');
  };

  return (
    <header className="header" style={{ backgroundImage: "url('/bg1.png')" }}>
    <div>
    <label className="hamburger-menu" onClick={toggleMenu}>&#9776;</label>
      <div className="header-buttons" id="hamburger-buttons">
           <button className="button-ind">About</button>
          <button className="button-ind">Contact</button>
    </div>
  </div>
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="header-logo" />
      </div>
      <section className='search-section'>
      <SearchBar onSearch={onSearch} />
      </section>
    </header>
  );
};

export default Header;

