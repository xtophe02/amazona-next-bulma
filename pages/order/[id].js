import Layout from '../../components/Layout';
import Steps from '../../components/Steps';

import { getOrderId } from '../../utils/fetchData';

import OrderFinal from '../../components/OrderFinal';

export default function OrderPage({ order, user }) {
  return (
    <Layout title='order'>
      <section className='section container is-max-desktop'>
        <Steps
          steps={{ login: true, shipping: true, payment: true, order: true }}
        />
        <OrderFinal order={order} user={user} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = context.req.cookies.user;
  const order = await getOrderId(context.query.id);

  return {
    props: { order: JSON.parse(order), user: JSON.parse(user) }, // will be passed to the page component as props
  };
}
