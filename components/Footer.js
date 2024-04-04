import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div>
        <a href="#" className="footer-link">Join Us</a>
        <p className="footer-text">Contact Us: contact@ucook.com</p>
      </div>
      <div className="social-icons">
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-facebook"></i></a>
      </div>
      <p className="footer-text">Personalized Cooking Assistant © 2024</p>
    </footer>
  );
};

export default Footer;
