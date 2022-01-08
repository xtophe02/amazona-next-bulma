import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useDispatchStateContext,
  useNotificationCtx,
} from '../context/stateContext';

export default function Payment({ payment }) {
  const [state, setState] = useState(payment);
  const router = useRouter();
  const dispatch = useDispatchStateContext();
  const { showNotification } = useNotificationCtx();
  const handleChange = (event) => {
    setState(event.target.value);
  };
  const handleSubmit = () => {
    if (state.trim() === '') {
      showNotification({
        title: 'Payment',
        status: 'is-danger',
        message: 'You need to choose between the payment methods',
      });
      return;
    }

    dispatch({ type: 'PAYMENT', payload: state });
    router.push('/order');
  };
  // console.log(state);
  return (
    <div className='container is-max-desktop'>
      <h1 className='title'>Payment Method</h1>
      <div
        className='control'
        style={{ display: 'flex', flexDirection: 'column' }}
        value={state}
      >
        <label className='radio m-1'>
          <input
            type='radio'
            name='rsvp'
            value='paypal'
            onClick={handleChange}
          />
          <span
            className={`ml-2 ${state === 'paypal' && 'has-text-weight-bold'}`}
          >
            PayPal
          </span>
        </label>
        <label className='radio m-1'>
          <input
            type='radio'
            name='rsvp'
            value='credit'
            onClick={handleChange}
          />
          <span
            className={`ml-2 ${state === 'credit' && 'has-text-weight-bold'}`}
          >
            Credit Card
          </span>
        </label>
        <label className='radio m-1' disabled>
          <input type='radio' name='rsvp' disabled />
          <span className='ml-2'>Google Pay</span>
        </label>
      </div>
      <div className='field is-grouped is-grouped-right'>
        <p className='control'>
          <button className='button is-primary' onClick={handleSubmit}>
            Continue
          </button>
        </p>
        <p className='control'>
          <Link href='/shipping'>
            <a className='button is-light'>Back</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
