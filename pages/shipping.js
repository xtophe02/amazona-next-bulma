import Layout from '../components/Layout';

import Steps from '../components/Steps';
import Shipping from '../components/Shipping';

export default function ShippingPage({ data }) {
  return (
    <Layout title='shipping'>
      <section className='section container is-max-desktop'>
        <Steps
          steps={{ login: true, shipping: false, payment: false, order: false }}
        />
        <Shipping shipping={data} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = context.req.cookies.user;
  const shipping = context.req.cookies.shipping
    ? JSON.parse(context.req.cookies.shipping)
    : null;

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { data: shipping }, // will be passed to the page component as props
  };
}
