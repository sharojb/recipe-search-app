import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('App Component Mounted');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
