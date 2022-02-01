import 'bootswatch/dist/zephyr/bootstrap.min.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";
import Layout from '../components/Layout';
import { AuthContextProvider } from '../context/AuthContext';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
