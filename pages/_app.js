import React, { useEffect } from 'react';
import '../styles/global.css';
import styles from '../styles/list.module.css';
import Header from '../components/Header';
import { AuthProvider } from '../AuthContext'; // Import the AuthProvider component

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('App Component Mounted');
  }, []);

  return (
    <AuthProvider> {/* Wrap your components with AuthProvider */}
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
