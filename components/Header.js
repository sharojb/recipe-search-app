import Link from 'next/link';

const Header = () => {
  return (
    <div>
      <Link href="/createprofile">Sign Up</Link>
      <Link href="/search-results">Search Results</Link>
    </div>
  );
};

export default Header;
