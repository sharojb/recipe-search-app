import Link from 'next/link';

const Header = () => {
  return (
    <div>
      <Link href="/createprofile">Sign Up</Link>
      <Link href="/search-results">Search Results</Link>
      <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
      <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
      <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
    </div>
  );
};

export default Header;