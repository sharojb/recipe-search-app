import React, { useEffect } from 'react';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('App Component Mounted');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
