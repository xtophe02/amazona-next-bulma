import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllDataAdmin } from '../../utils/fetchData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '2022 Sales',
    },
  },
};

export default function DashboarPage({ data: { users, orders, products } }) {
  const months = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString('en-US', { month: 'long' });
  });
  const salesMonth = orders.reduce((acc, val) => {
    if (val.isPaid) {
      acc[months[new Date(val.paidAt).getMonth()]] =
        Number(val.totalPrice) +
        Number([acc[months[new Date(val.paidAt).getMonth()]]]);
    }
    return acc;
  }, {});
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Revenues',
        data: Object.values(salesMonth),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const calcSales = () => {
    return orders.reduce((acc, val) => {
      if (val.isPaid) {
        acc += val.totalPrice;
      }

      return acc;
    }, 0);
  };
  const NavLink = ({ href, children }) => (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );

  return (
    <Layout title='dashboard'>
      <section className='section'>
        <h1 className='title'>Dashboard</h1>
        <nav className='level'>
          <div className='level-item has-text-centered'>
            <div>
              <NavLink href='/admin/orders'>
                <p className='heading'>Sales</p>
                <p className='title'>
                  {calcSales()
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
              </NavLink>
            </div>
          </div>
          <div className='level-item has-text-centered'>
            <div>
              <NavLink href='/admin/orders'>
                <p className='heading'>Orders</p>
                <p className='title'>{orders.length}</p>
              </NavLink>
            </div>
          </div>
          <div className='level-item has-text-centered'>
            <NavLink href='/admin/products'>
              <p className='heading'>Products</p>
              <p className='title'>{products}</p>
            </NavLink>
          </div>
          <div className='level-item has-text-centered'>
            <div>
              <NavLink href='/admin/users'>
                <p className='heading'>Users</p>
                <p className='title'>{users}</p>
              </NavLink>
            </div>
          </div>
        </nav>
        <Bar options={options} data={data} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = context.req.cookies.user;

  if (!user || (user && !JSON.parse(user).isAdmin)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const { users, orders, products } = await getAllDataAdmin();

  return {
    props: {
      data: {
        users,
        orders: JSON.parse(orders),
        products,
      },
    }, // will be passed to the page component as props
  };
}
