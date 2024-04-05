import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <div className="header-buttons">
        <button className="button">About</button>
        <button className="button">Contact</button>
        <button className="button">Join Us</button>
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
            <button className="button">Join Us</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
