import Link from 'next/link';

const Header = () => {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/createprofile">
        <a>Create Profile</a>
      </Link>
      <Link href="/search-results">
        <a>Search Results</a>
      </Link>
    </div>
  );
};

export default Header;
