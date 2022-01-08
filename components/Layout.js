import Head from 'next/head';
import { useNotificationCtx } from '../context/stateContext';
// import Footer from './Footer';
import Navbar from './Navbar';
import Notification from './Notification';

export default function Layout({ children, title, keywords, description }) {
  const { activeNotification } = useNotificationCtx();

  return (
    <>
      <Head>
        <title>{title} | Amazona</title>
        <meta name='keywords' content={keywords} />
        <meta name='description' content={description} />
        <meta name='author' content='Christophe Moreira' />
        {/* <link rel='icon' href='/favicon.icon' /> */}
      </Head>

      <Navbar />

      <main className='container'>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      {/* <Footer /> */}
    </>
  );
}
Layout.defaultProps = {
  title: 'Welcome',
  keywords: 'development, coding, programing, tutorial',
  description: 'Ecommerce Amazona',
};
