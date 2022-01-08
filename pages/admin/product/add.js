import Layout from '../../../components/Layout';

import { useForm, Controller } from 'react-hook-form';
import { useNotificationCtx } from '../../../context/stateContext';
import axios from 'axios';
import { useState } from 'react';

import { useRouter } from 'next/router';

export default function AddProductPage({ user }) {
  const { showNotification } = useNotificationCtx();
  const [state, setState] = useState({ loading: false, file: '' });
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      slug: '',
      price: '',
      image: '',
      category: '',
      brand: '',
      countInStock: '',
      description: '',
    },
  });
  const uploadHandler = async (e) => {
    setState((prev) => ({ ...prev, loading: true }));
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      const { data } = await axios.post('/api/product/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${user.token}`,
        },
      });

      showNotification({
        title: 'Success',
        status: 'is-success',
        message:
          'Product Added! Be aware that it will take 10 seconds to appear on the shop',
      });
      setState((prev) => ({ ...prev, loading: false, file: data.secure_url }));
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false }));
      showNotification({
        title: 'Error',
        status: 'is-danger',
        message: 'something went wrong',
      });
    }
  };
  const onSubmit = async (data) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const { data: dataAPI } = await axios.post(
        `/api/product/add`,
        {
          ...data,
          image: state.file,
        },
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      console.log(dataAPI);
      setState((prev) => ({ ...prev, loading: false }));
      showNotification({
        title: 'Success',
        status: 'is-success',
        message:
          'Product Added! Be aware that it will take 10 seconds to appear on the shop',
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
        <h1 className='title'>Add Product</h1>
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
            <label className='label is-capitalized'>Slug</label>
            <div className='control'>
              <Controller
                name='slug'
                control={control}
                rules={{ required: true, minLength: 2 }}
                render={({ field }) => (
                  <input
                    className={`input ${errors.slug && 'is-danger'}`}
                    {...field}
                  />
                )}
              />
            </div>
            {errors.slug && (
              <p className='help is-danger'>
                Slug required and at least 2x chars
              </p>
            )}
          </div>
          <div className='field'>
            <label className='label is-capitalized'>Price</label>
            <div className='control'>
              <Controller
                name='price'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    className={`input ${errors.price && 'is-danger'}`}
                    {...field}
                    type='number'
                  />
                )}
              />
            </div>
            {errors.price && (
              <p className='help is-danger'>
                Price required and at least 2x chars
              </p>
            )}
          </div>
          <div className='field'>
            <label className='label'>Image</label>
            <div className='control'>
              <div className='file has-name is-fullwidth'>
                <label className='file-label'>
                  <input
                    className='file-input'
                    type='file'
                    name='resume'
                    onChange={uploadHandler}
                  />
                  <span className='file-cta'>
                    <span className='file-icon'>
                      <i className='fas fa-upload'></i>
                    </span>
                    <span className='file-label'>
                      {state.loading ? 'loading...' : 'Choose a file…'}
                    </span>
                  </span>
                  <span className='file-name'>
                    {state.file ? state.file : 'Please to Upload an Image'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className='field'>
            <label className='label is-capitalized'>Category</label>
            <div className='control'>
              <Controller
                name='category'
                control={control}
                rules={{ required: true, minLength: 2 }}
                render={({ field }) => (
                  <input
                    className={`input ${errors.category && 'is-danger'}`}
                    {...field}
                  />
                )}
              />
            </div>
            {errors.category && (
              <p className='help is-danger'>
                Category required and at least 2x chars
              </p>
            )}
          </div>
          <div className='field'>
            <label className='label is-capitalized'>Brand</label>
            <div className='control'>
              <Controller
                name='brand'
                control={control}
                rules={{ required: true, minLength: 2 }}
                render={({ field }) => (
                  <input
                    className={`input ${errors.brand && 'is-danger'}`}
                    {...field}
                  />
                )}
              />
            </div>
            {errors.brand && (
              <p className='help is-danger'>
                Brand required and at least 2x chars
              </p>
            )}
          </div>
          <div className='field'>
            <label className='label is-capitalized'>Count In Stock</label>
            <div className='control'>
              <Controller
                name='countInStock'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    className={`input ${errors.countInStock && 'is-danger'}`}
                    {...field}
                    type='number'
                  />
                )}
              />
            </div>
            {errors.countInStock && (
              <p className='help is-danger'>Stock required</p>
            )}
          </div>
          <div className='field'>
            <label className='label is-capitalized'>Description</label>
            <div className='control'>
              <Controller
                name='description'
                control={control}
                rules={{ required: true, minLength: 5 }}
                render={({ field }) => (
                  <textarea
                    className={`textarea ${errors.description && 'is-danger'}`}
                    {...field}
                  />
                )}
              />
            </div>
            {errors.description && (
              <p className='help is-danger'>
                Description required and at least 5x chars
              </p>
            )}
          </div>
          <div className='field'>
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
        </form>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const user = context.req.cookies.user;

  if (!user || (user && !JSON.parse(user).isAdmin)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { user: JSON.parse(user) },
  };
}
