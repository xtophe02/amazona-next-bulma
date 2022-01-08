import { getAllOrders } from '../../utils/fetchData';

import Layout from '../../components/Layout';
import TableOrders from '../../components/TableOrders';

export default function OrdersAdminPage({ orders }) {
  return (
    <Layout title='user orders'>
      <section className='section'>
        <TableOrders orders={orders} user={true} />
      </section>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const user = context.req.cookies.user;
  const orders = await getAllOrders();

  if (!user || (user && !JSON.parse(user).isAdmin)) {
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
