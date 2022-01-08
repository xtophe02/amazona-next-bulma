import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';
import {
  useDispatchStateContext,
  useNotificationCtx,
} from '../context/stateContext';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const initValues = {
  showPassword: false,
  loading: false,
};

export default function RegisterPage() {
  const [state, setState] = useState(initValues);
  const router = useRouter();
  const dispatch = useDispatchStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { showNotification } = useNotificationCtx();

  const onSubmit = async ({ name, password, email, confirmPassword }) => {
    setState((prev) => ({ ...prev, loading: true }));
    let flag = false;
    if (password.trim() !== confirmPassword.trim()) {
      flag = true;
      setState((prev) => ({ ...prev, loading: false }));
      showNotification({
        title: 'Password',
        status: 'is-danger',
        message: 'Password and Confirm Password does not match',
      });
    }
    if (!flag) {
      try {
        const { data } = await axios.post('/api/user/register', {
          name,
          email,
          password,
        });
        dispatch({ type: 'SET_USER', payload: data });
        showNotification({
          title: 'success',
          status: 'is-success',
          message: 'you have successful registered',
        });
        router.back();
        setState(initValues);
      } catch (error) {
        showNotification({
          title: error.response.data.error,
          status: 'is-danger',
          message: 'please try again',
        });
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
  };
  return (
    <Layout title='login'>
      <section className='section container is-max-desktop'>
        <h1 className='title'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label className='label'>Name</label>
            <div className='control'>
              <input
                className={`input ${errors.name && 'is-danger'}`}
                placeholder='Your Name'
                {...register('name', { required: true, minLength: 2 })}
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
              <input
                className={`input ${errors.email && 'is-danger'}`}
                placeholder='Your Email'
                {...register('email', {
                  required: true,
                  pattern:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
                })}
              />
            </div>
          </div>

          {errors.email && <p className='help is-danger'>Email required</p>}

          <div className='field'>
            <div className='control'>
              <label className='label'>Password</label>
            </div>
          </div>
          <div className='field has-addons'>
            <div className='control is-expanded'>
              <input
                className={`input ${errors.password && 'is-danger'}`}
                type={state.showPassword ? 'text' : 'password'}
                placeholder='Your Password'
                {...register('password', { required: true, minLength: 5 })}
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

          <div className='field'>
            <div className='control'>
              <label className='label'>Confirm Password</label>
            </div>
          </div>
          <div className='field has-addons'>
            <div className='control is-expanded'>
              <input
                className={`input ${errors.confirmPassword && 'is-danger'}`}
                type={state.showPassword ? 'text' : 'password'}
                placeholder='Confirm Your Password'
                {...register('confirmPassword', {
                  required: true,
                  minLength: 5,
                })}
              />
              {errors.confirmPassword && (
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
                Submit
              </button>
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <label className='checkbox'>
                <small>
                  Already have an account?&nbsp;
                  <Link href='/login'>
                    <a>Login</a>
                  </Link>
                </small>
              </label>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = context.req.cookies.user;

  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
