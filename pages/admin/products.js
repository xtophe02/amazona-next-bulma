import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getAllAllProducts } from '../../utils/fetchData';
export default function ProductsAdminPage({ products, user }) {
  const [state, setState] = useState(products);
  const router = useRouter();
  const handleDelete = async (id) => {
    await axios.delete(
      `/api/product/delete/${id}`,

      { headers: { authorization: `Bearer ${user.token}` } }
    );
    const newState = state.filter((el) => el._id !== id);
    setState(newState);
  };
  return (
    <Layout>
      <section className='section'>
        <h1 className='title'>Admin Products</h1>
      </section>
      <div className='field is-grouped is-grouped-right'>
        <p className='control'>
          <Link href='/admin/product/add'>
            <a className='button is-primary'>Add Product</a>
          </Link>
        </p>
      </div>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>COUNT</th>
            <th>RATING</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {state.map((prod) => (
            <tr key={prod._id}>
              <td>{prod._id.slice(-4)}</td>
              <td>{prod.name}</td>
              <td>
                {prod.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </td>
              <td>{prod.category}</td>
              <td>{prod.countInStock}</td>
              <td>{prod.rating}</td>
              <td>
                <div className='field has-addons'>
                  <p className='control'>
                    <button
                      className='button '
                      onClick={() => router.push(`/admin/product/${prod.slug}`)}
                    >
                      <span className='icon '>
                        <i className='far fa-lg fa-edit'></i>
                      </span>
                    </button>
                  </p>
                  <p className='control'>
                    <button
                      className='button'
                      onClick={() => handleDelete(prod._id)}
                    >
                      <span className='icon '>
                        <i className='far fa-lg fa-trash-alt'></i>
                      </span>
                    </button>
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  try {
    const products = await getAllAllProducts();

    return {
      props: {
        products: JSON.parse(products),
        user: JSON.parse(user),
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return { props: { products: [] } };
  }
}
