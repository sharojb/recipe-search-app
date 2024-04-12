import React, { useEffect } from 'react';
import '../styles/global.css';
import styles from '../styles/list.module.css';
import Header from '../components/Header';


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('App Component Mounted');
  }, []);

  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
