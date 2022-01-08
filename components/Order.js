import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useDispatchStateContext,
  useNotificationCtx,
} from '../context/stateContext';
import axios from 'axios';

export default function Order({ payment, shipping, cart, userToken }) {
  const router = useRouter();
  const dispatch = useDispatchStateContext();
  const { showNotification } = useNotificationCtx();
  const [loading, setLoading] = useState(false);
  const calcTotal = () => {
    return cart.reduce((acc, val) => {
      acc += Number(val.quantity) * Number(val.price);
      return acc;
    }, 0);
  };
  const items = calcTotal();
  const taxPrice = Math.round(items * 0.15 * 100 + Number.EPSILON) / 100;

  const shippingPrice = items > 10000 ? 0 : 500;
  const totalPrice = items + taxPrice + shippingPrice;
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        '/api/order',
        {
          orderItems: cart,
          shippingAddress: shipping,
          paymentMethod: payment,
          itemsPrice: items,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      showNotification({
        title: 'Order',
        status: 'is-success',
        message: 'You have successfully place an order',
      });

      dispatch({ type: 'CART_CLEAR' });

      setLoading(false);
      router.push(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);
      showNotification({
        title: 'Order',
        status: 'is-danger',
        message: error.response.data.error,
      });
    }
  };
  // console.log(state);
  return (
    <div className='container is-max-desktop'>
      <h1 className='title'>Order Status</h1>
      <div className='columns'>
        <div className='column is-four-fifths'>
          <div className='box'>
            <h3 className='is-size-4 mb-2'>Shipping Address </h3>
            {shipping.name}
            <br />
            {shipping.postalCode}&nbsp;{shipping.address}
            <br />
            {shipping.country}
          </div>
          <div className='box'>
            <h3 className='is-size-4 mb-2'>Payment Method</h3>
            {payment}
          </div>
          <div className='box'>
            <h3 className='is-size-4 mb-2'>Items</h3>
            <table className='table is-striped is-fullwidth'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      $
                      {(item.quantity * item.price)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{' '}
        </div>
        <div className='column'>
          <div className='box'>
            <h3 className='is-size-4 mb-2 has-text-centered'>Summary</h3>
            <table className='table is-fullwidth'>
              <tbody>
                <tr>
                  <th>Items</th>
                  <td>
                    ${items.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </tr>

                <tr>
                  <th>Tax</th>
                  <td>
                    ${taxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </tr>

                <tr>
                  <th>Shipping</th>
                  <td>
                    $
                    {shippingPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </td>
                </tr>
                <tr>
                  <th>TOTAL</th>
                  <th>
                    $
                    {totalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </th>
                </tr>
              </tbody>
            </table>
            <button
              className={`button is-fullwidth is-primary is-uppercase has-text-weight-bold ${
                loading && 'is-loading'
              }`}
              onClick={handleSubmit}
            >
              Order
            </button>
          </div>
        </div>
      </div>

      <div className='field is-grouped is-grouped-right'>
        {/* <p className='control'>
          <button className='button is-primary' onClick={handleSubmit}>
            Continue
          </button>
        </p> */}
        <p className='control'>
          <Link href='/payment'>
            <a className='button is-light'>Back</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
