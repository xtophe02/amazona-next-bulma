import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { getAllUsers } from '../../utils/fetchData';

export default function UsersAdminPage({ users, user }) {
  const [state, setState] = useState(users);
  const router = useRouter();
  const handleDelete = async (id) => {
    await axios.delete(
      `/api/user/delete/${id}`,

      { headers: { authorization: `Bearer ${user.token}` } }
    );
    const newState = state.filter((el) => el._id !== id);
    setState(newState);
  };
  return (
    <Layout>
      <section className='section'>
        <h1 className='title'>Admin Users</h1>
      </section>

      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ISADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {state.map((prod) => (
            <tr key={prod._id}>
              <td>{prod._id.slice(-4)}</td>
              <td>{prod.name}</td>
              <td>{prod.email}</td>
              <td>{prod.isAdmin ? 'YES' : 'NO'}</td>

              <td>
                <div className='field has-addons'>
                  <p className='control'>
                    <button
                      className='button '
                      onClick={() => router.push(`/admin/user/${prod._id}`)}
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
  const users = await getAllUsers();

  return {
    props: {
      users: JSON.parse(users),
      user: JSON.parse(user),
    }, // will be passed to the page component as props
  };
}
