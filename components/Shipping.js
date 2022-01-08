import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useDispatchStateContext } from '../context/stateContext';
export default function Shipping({ shipping }) {
  const dispatch = useDispatchStateContext();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: shipping ? shipping.name : '',
      address: shipping ? shipping.address : '',
      city: shipping ? shipping.city : '',
      postalCode: shipping ? shipping.postalCode : '',
      country: shipping ? shipping.country : '',
    },
  });
  const onSubmit = async (data) => {
    dispatch({ type: 'SHIPPING', payload: data });
    router.push('/payment');
  };
  return (
    <div className='container is-max-desktop'>
      <h1 className='title'>Shipping Address</h1>
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
                  placeholder='Full Name'
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
          <label className='label'>Full Address</label>
          <div className='control'>
            <Controller
              name='address'
              control={control}
              rules={{ required: true, minLength: 2 }}
              render={({ field }) => (
                <input
                  className={`input ${errors.address && 'is-danger'}`}
                  placeholder='Full Address'
                  {...field}
                />
              )}
            />
          </div>
          {errors.address && (
            <p className='help is-danger'>
              Address required and at least 2x chars
            </p>
          )}
        </div>
        <div className='field'>
          <label className='label'>City</label>
          <div className='control'>
            <Controller
              name='city'
              control={control}
              rules={{ required: true, minLength: 2 }}
              render={({ field }) => (
                <input
                  className={`input ${errors.city && 'is-danger'}`}
                  placeholder='City'
                  {...field}
                />
              )}
            />
          </div>
          {errors.city && (
            <p className='help is-danger'>
              City required and at least 2x chars
            </p>
          )}
        </div>
        <div className='field'>
          <label className='label'>Postal Code</label>
          <div className='control'>
            <Controller
              name='postalCode'
              control={control}
              rules={{ required: true, minLength: 2 }}
              render={({ field }) => (
                <input
                  className={`input ${errors.postalCode && 'is-danger'}`}
                  placeholder='Postal Code'
                  {...field}
                />
              )}
            />
          </div>
          {errors.postalCode && (
            <p className='help is-danger'>
              Postal Code required and at least 2x chars
            </p>
          )}
        </div>
        <div className='field'>
          <label className='label'>Country</label>
          <div className='control'>
            <Controller
              name='country'
              control={control}
              rules={{ required: true, minLength: 2 }}
              render={({ field }) => (
                <input
                  className={`input ${errors.country && 'is-danger'}`}
                  placeholder='Country'
                  {...field}
                />
              )}
            />
          </div>
          {errors.country && (
            <p className='help is-danger'>
              Country required and at least 2x chars
            </p>
          )}
        </div>

        <div className='field'>
          <div className='control'>
            <button
              type='submit'
              className='button is-primary is-fullwidth is-uppercase has-text-weight-bold'
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
