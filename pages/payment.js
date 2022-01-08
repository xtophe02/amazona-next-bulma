import Layout from '../components/Layout';

import Steps from '../components/Steps';
import Payment from '../components/Payment';

export default function PaymentPage({ data }) {
  return (
    <Layout title='payment'>
      <section className='section container is-max-desktop'>
        <Steps
          steps={{ login: true, shipping: true, payment: false, order: false }}
        />
        <Payment payment={data} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = context.req.cookies.user;
  const payment = context.req.cookies.payment
    ? context.req.cookies.payment
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
    props: { data: payment }, // will be passed to the page component as props
  };
}
