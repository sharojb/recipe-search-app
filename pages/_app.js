// pages/_app.js
import '../styles/globals.css';  // Import your global styles here
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // This will run on initial load
    console.log('App Component Mounted');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
