import '../styles/globals.scss';
import '../styles/nprogress.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import { StateProvider } from '../context/stateContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps }) {
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());
  return (
    <StateProvider>
      <PayPalScriptProvider deferLoading={true}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </StateProvider>
  );
}

export default MyApp;
