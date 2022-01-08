import Layout from '../../components/Layout';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import {
  useDispatchStateContext,
  useNotificationCtx,
} from '../../context/stateContext';
import { useRouter } from 'next/router';

export default function ProfilePage({ user }) {
  const [state, setState] = useState({ showPassword: false, loading: false });
  const dispatch = useDispatchStateContext();
  const { showNotification } = useNotificationCtx();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      password: '',
    },
  });
  const onSubmit = async (data) => {
    setState((prev) => ({ ...prev, loading: true }));
    const newValues = {};
    ['name', 'email'].reduce((acc, val) => {
      if (user[val] !== data[val]) {
        acc[val] = data[val];
      }

      return acc;
    }, newValues);
    if (data.password !== '') {
      newValues.password = data.password;
    }

    try {
      const { data: dataFromAPI } = await axios.post(
        '/api/user/update',
        {
          ...newValues,
          _id: user._id,
        },
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      dispatch({ type: 'SET_USER', payload: dataFromAPI });
      setState((prev) => ({ ...prev, loading: false }));
      showNotification({
        title: 'success',
        status: 'is-success',
        message: 'you have successful update your profile',
      });
      router.push('/');
    } catch (error) {
      console.log(error);
      setState((prev) => ({ ...prev, loading: false }));
      showNotification({
        title: 'error',
        status: 'is-danger',
        message: 'somthing went wrong',
      });
    }
  };
  return (
    <Layout title='My Profile'>
      <section className='section'>
        <h1 className='title'>My Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label className='label'>Full Name</label>
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
            <label className='label'>Email</label>
            <div className='control'>
              <Controller
                name='email'
                control={control}
                rules={{
                  required: true,
                  pattern:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
                }}
                render={({ field }) => (
                  <input
                    className={`input ${errors.email && 'is-danger'}`}
                    {...field}
                  />
                )}
              />
            </div>
            {errors.email && (
              <p className='help is-danger'>
                Email required and at least 2x chars
              </p>
            )}
          </div>

          <div className='field'>
            <div className='control'>
              <label className='label'>Password</label>
            </div>
          </div>
          <div className='field has-addons'>
            <div className='control is-expanded'>
              <Controller
                name='password'
                control={control}
                rules={{ minLength: 5 }}
                render={({ field }) => (
                  <input
                    className={`input ${errors.password && 'is-danger'}`}
                    type={state.showPassword ? 'text' : 'password'}
                    {...field}
                  />
                )}
              />

              {errors.password && (
                <p className='help is-danger'>
                  Password required and at least 5x chars
                </p>
              )}
            </div>
            <div className='control'>
              <a
                className='button is-info'
                onClick={(e) => {
                  e.preventDefault();
                  setState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }));
                }}
              >
                {state.showPassword ? 'Hide' : 'Show'}
              </a>
            </div>
          </div>
          <div className='field '>
            <div className='control'>
              <button
                type='submit'
                className={`button is-primary is-fullwidth is-uppercase has-text-weight-bold ${
                  state.loading && 'is-loading'
                }`}
              >
                update
              </button>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = context.req.cookies.user;

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { user: JSON.parse(user) }, // will be passed to the page component as props
  };
}
