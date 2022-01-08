import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useNotificationCtx } from '../context/stateContext';

// This values are the props in the UI

const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and handle currency changes
export const PayPal = (props) => {
  const { currency, showSpinner, userToken, amount, orderId } = props;
  const router = useRouter();
  const { showNotification } = useNotificationCtx();
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPaypalScript = async () => {
      const { data } = await axios.get('/api/keys/paypal', {
        headers: { authorization: `Bearer ${userToken}` },
      });

      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          'client-id': data,
          currency: currency,
        },
      });
    };
    loadPaypalScript();
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && (
        <progress className='progress is-small is-primary' max='100'>
          15%
        </progress>
      )}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order

              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(async function (details) {
            try {
              // console.log(details);
              const { data } = await axios.put(
                `/api/order/${orderId}`,
                details,
                {
                  headers: { authorization: `Bearer ${userToken}` },
                }
              );
              // console.log('DATA', data);
              showNotification({
                title: 'Payment success',
                status: 'is-success',
                message: 'Your Payment was successfull',
              });
              router.push('/user/orders');
            } catch (error) {
              showNotification({
                title: 'Payment Error',
                status: 'is-danger',
                message: 'Your Payment not done',
              });
            }
          });
        }}
        onError={function onError(err) {
          console.log(err);
          showNotification({
            title: 'Payment Error',
            status: 'is-danger',
            message: 'Something went wrong',
          });
        }}
      />
    </>
  );
};

export default PayPal;
