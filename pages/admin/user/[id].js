import Layout from '../../../components/Layout';
import { getUserId } from '../../../utils/fetchData';
import { useForm, Controller } from 'react-hook-form';
import { useNotificationCtx } from '../../../context/stateContext';
import axios from 'axios';
import { useState } from 'react';

import { useRouter } from 'next/router';

export default function EditProductPage({ user, userToken }) {
  const { showNotification } = useNotificationCtx();
  const [state, setState] = useState({ loading: false, isAdmin: user.isAdmin });
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      isAdmin: user.slug,
    },
  });
  const onSubmit = async (data) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      await axios.put(
        `/api/user/admin/update`,
        {
          ...data,
          isAdmin: state.isAdmin,
          _id: user._id,
        },
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      setState((prev) => ({ ...prev, loading: false }));
      showNotification({
        title: 'Success',
        status: 'is-success',
        message:
          'User Updated! Be aware that it will take 10 seconds to appear on the shop',
      });
      router.push('/admin/dashboard');
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      showNotification({
        title: 'Error',
        status: 'is-danger',
        message: 'something went wrong',
      });
    }
  };

  return (
    <Layout title='Edit Product'>
      <section className='section'>
        <h1 className='title'>Edit User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label className='label is-capitalized'>Name</label>
            <div className='control'>
              <Controller
                name='name'
                control={control}
                rules={{ required: true, minLength: 2 }}
                render={({ field }) => (
                  <input
                    className={`input ${errors.name && 'is-danger'}`}
                    {...field}
                  />
                )}
              />
            </div>
            {errors.name && (
              <p className='help is-danger'>
                Name required and at least 2x chars
              </p>
            )}
          </div>
          <div className='field'>
            <label className='checkbox'>
              <input
                type='checkbox'
                onChange={(e) =>
                  setState((prev) => ({ ...prev, isAdmin: e.target.checked }))
                }
                defaultChecked={state.isAdmin}
              />
              <span className='m-2'>Is Admin</span>
            </label>
          </div>

          <div className='field'>
            <div className='control'>
              <button
                type='submit'
                className={`button is-primary is-fullwidth is-uppercase has-text-weight-bold ${
                  state.loading && 'is-loading'
                }`}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const data = context.req.cookies.user;
  const user = await getUserId(context.query.id);

  if (!data || (data && !JSON.parse(data).isAdmin)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { user: JSON.parse(user), userToken: JSON.parse(data).token },
  };
}
