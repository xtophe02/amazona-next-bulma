import { getOrdersByUserId } from '../../utils/fetchData';

import Layout from '../../components/Layout';
import TableOrders from '../../components/TableOrders';

export default function OrdersUserPage({ orders }) {
  return (
    <Layout title='user orders'>
      <section className='section'>
        <TableOrders orders={orders} />
      </section>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const user = context.req.cookies.user;
  const orders = await getOrdersByUserId(JSON.parse(user)._id);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { orders: JSON.parse(orders) },
  };
}
