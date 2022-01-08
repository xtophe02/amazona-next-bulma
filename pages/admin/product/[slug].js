import Layout from '../../../components/Layout';
import { getProductSlug } from '../../../utils/fetchData';
import { useForm, Controller } from 'react-hook-form';
import { useNotificationCtx } from '../../../context/stateContext';
import axios from 'axios';
import { useState } from 'react';

import { useRouter } from 'next/router';

export default function EditProductPage({ product, user }) {
  const { showNotification } = useNotificationCtx();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
      countInStock: product.countInStock,
      description: product.description,
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const dataToSave = {};
    Object.keys(data).forEach((el) => {
      if (data[el] !== product[el]) {
        dataToSave[el] = data[el];
      }
    });
    if (Object.keys(dataToSave) <= 0) {
      setLoading(false);
      showNotification({
        title: 'Fields not Adapted',
        status: 'is-warning',
        message: 'no field was updated',
      });
    } else {
      try {
        const { data } = await axios.put(
          `/api/product/${product._id}`,
          {
            ...dataToSave,
          },
          { headers: { authorization: `Bearer ${user.token}` } }
        );
        setLoading(false);
        showNotification({
          title: 'Success',
          status: 'is-success',
          message:
            'Product Upaded! Be aware that it will take 10 seconds to appear on the shop',
        });
        router.push('/admin/dashboard');
      } catch (error) {
        setLoading(false);
        showNotification({
          title: 'Error',
          status: 'is-danger',
          message: 'something went wrong',
        });
      }
    }
  };

  return (
    <Layout title='Edit Product'>
      <section className='section'>
        <h1 className='title'>Edit Product</h1>
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
            <label className='label is-capitalized'>Image</label>
            <div className='control'>
              <Controller
                name='image'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    className={`input ${errors.image && 'is-danger'}`}
                    {...field}
                  />
                )}
              />
            </div>
            {errors.image && (
              <p className='help is-danger'>Image is required</p>
            )}
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
                  loading && 'is-loading'
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
  const user = context.req.cookies.user;
  const product = await getProductSlug(context.query.slug);

  if (!user || (user && !JSON.parse(user).isAdmin)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { product: JSON.parse(product), user: JSON.parse(user) },
  };
}
