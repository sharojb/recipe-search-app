import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [showEmail, setShowEmail] = useState(false);

  const toggleEmail = () => {
    setShowEmail(!showEmail);
  };

  return (
    <footer className="footer">
      <div>
        <a href="#" className="footer-link" onClick={toggleEmail}>
          {showEmail ? 'Hide Email' : 'Contact Us'}
        </a>
        {showEmail && <p className="footer-text">contact@ucook.com</p>}
      </div>
      <div className="social-icons">
        <a href="#" ><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
      </div>
      <p className="footer-text" style={{ flexGrow: 1 }}>Personalized Cooking Assistant © 2024</p>
    </footer>
  );
};

export default Footer;
