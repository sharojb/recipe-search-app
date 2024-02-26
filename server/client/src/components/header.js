// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/create-profile">Create Profile</Link>
      <Link to="/search-results">Search Results</Link>
    </div>
  );
};

export default Header;
