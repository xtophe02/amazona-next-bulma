import Layout from '../components/Layout';
import Order from '../components/Order';

import Steps from '../components/Steps';

export default function OrderPage({ cart, shipping, payment, userToken }) {
  return (
    <Layout title='order'>
      <section className='section container is-max-desktop'>
        <Steps
          steps={{ login: true, shipping: true, payment: true, order: false }}
        />
        <Order
          cart={cart}
          shipping={shipping}
          payment={payment}
          userToken={userToken}
        />
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = context.req.cookies.user;
  const { cart, shipping, payment } = context.req.cookies;

  if (!user || !cart) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(cart),
      shipping: JSON.parse(shipping),
      payment,
      userToken: JSON.parse(user).token,
    },
  };
}
