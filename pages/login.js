import Link from 'next/link';
import Layout from '../components/Layout';
import { useState } from 'react';
import axios from 'axios';
import {
  useDispatchStateContext,
  useNotificationCtx,
} from '../context/stateContext';
import { useRouter } from 'next/router';

const initValues = {
  email: '',
  password: '',
  loading: false,
  showPassword: false,
};

export default function LoginPage() {
  const [state, setState] = useState(initValues);
  const router = useRouter();
  const dispatch = useDispatchStateContext();
  const { showNotification } = useNotificationCtx();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    let flag = false;
    Object.values(state).forEach((el) => {
      if (el.toString().trim() === '') {
        setState((prev) => ({ ...prev, loading: false }));
        flag = true;
      }
    });
    if (!flag) {
      try {
        const { data } = await axios.post('/api/user/login', {
          email: state.email,
          password: state.password,
        });

        dispatch({ type: 'SET_USER', payload: data });
        showNotification({
          title: 'success',
          status: 'is-success',
          message: 'you have successful login',
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
        <h1 className='title'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <label className='label'>Email</label>
            <div className='control'>
              <input
                className='input'
                type='email'
                placeholder='Your Email'
                value={state.email}
                name='email'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <label className='label'>Password</label>
            </div>
          </div>
          <div className='field has-addons'>
            <div className='control is-expanded'>
              <input
                className='input'
                type={state.showPassword ? 'text' : 'password'}
                placeholder='Your Password'
                value={state.password}
                name='password'
                onChange={handleChange}
              />
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
                  Don&apos;t have an account?&nbsp;
                  <Link href='/register'>
                    <a>Register</a>
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
