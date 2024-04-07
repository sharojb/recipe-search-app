import React, { useState } from 'react';
import SearchBar from './SearchBar';

const Header = ({ onSearch }) => { 
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header" style={{ backgroundImage: "url('/bg1.png')" }}>
      <div>
      <label onClick={toggleMenu}>&#9776;</label>
      {
      showMenu && (
        <div className="header-buttons">
        <button className="button-menu">About</button>
        <button className="button-menu">Contact</button>
      </div>
      	)
      }
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

