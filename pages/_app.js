import React, { useEffect } from 'react';
import '../styles/create.module.css';
import '../styles/global.css';
import Header from '../server/client/src/components/Header';


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('App Component Mounted');
  }, []);

  return (
    <div>
      {/*Header component here */}
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
