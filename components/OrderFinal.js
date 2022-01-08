import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useNotificationCtx } from '../context/stateContext';
import PayPal from './PayPal';

export default function OrderFinal({ order, user }) {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotificationCtx();
  const router = useRouter();
  const {
    orderItems,
    isPaid,
    itemsPrice,
    createdAt,
    isDelivered,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
    _id,
  } = order;

  const date = new Date(createdAt).toLocaleDateString('en-EN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const handleDeliver = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        '/api/order/deliver',
        {
          id,
        },
        { headers: { authorization: `Bearer ${user.token}` } }
      );
      setLoading(false);
      showNotification({
        title: 'Success',
        status: 'is-success',
        message: 'Delivered successful',
      });
      router.push('/admin/orders');
    } catch (error) {
      console.log(error);
      setLoading(false);
      showNotification({
        title: 'Error',
        status: 'is-danger',
        message: 'Something went wrong!!!',
      });
    }
  };
  return (
    <div className='container is-max-desktop'>
      <h1 className='title'>Order {date}</h1>
      <div className='columns'>
        <div className='column is-four-fifths'>
          <div className='box'>
            <h3 className='is-size-4 mb-2'>Shipping Address</h3>
            <div className='columns'>
              <div className='column is-three-fifths'>
                {shippingAddress.name}
                <br />
                {shippingAddress.postalCode}&nbsp;{shippingAddress.address}
                <br />
                {shippingAddress.country}
              </div>
              <div className='column'>
                STATUS:&nbsp;
                {isDelivered ? (
                  <span className='has-text-primary'>DELIVERED</span>
                ) : (
                  <span className='has-text-danger'>NOT DELIVERED</span>
                )}
              </div>
            </div>
          </div>
          <div className='box'>
            <h3 className='is-size-4 mb-2'>Payment Method</h3>
            <div className='columns'>
              <div className='column is-three-fifths'>{paymentMethod}</div>
              <div className='column'>
                STATUS:&nbsp;
                {isPaid ? (
                  <span className='has-text-primary'>PAID</span>
                ) : (
                  <span className='has-text-danger'>NOT PAID</span>
                )}
              </div>
            </div>
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
                {orderItems.map((item) => (
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
                    $
                    {itemsPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
            {!isPaid && (
              <PayPal
                currency='USD'
                showSpinner={true}
                userToken={user.token}
                amount={totalPrice}
                orderId={_id}
              />
            )}
            {user.isAdmin && (
              <button
                className={`button is-fullwidth is-primary is-capitalized ${
                  loading && 'is-loading'
                }`}
                onClick={() => handleDeliver(router.query.id)}
              >
                Deliver Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
