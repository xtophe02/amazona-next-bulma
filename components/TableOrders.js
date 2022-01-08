import Link from 'next/link';
export default function TableOrders({ orders, user = false }) {
  const dateTransf = (date) =>
    new Date(date).toLocaleDateString('en-EN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  return (
    <table className='table is-striped is-fullwidth'>
      <thead>
        <tr>
          <th>Id</th>
          {user && <th>Email</th>}
          <th>Date</th>
          <th>Total</th>
          <th>Paid</th>
          <th>Delivered</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((el) => (
          <tr key={el._id}>
            <td>{el._id.slice(-4)}</td>
            {user && <td>{el.user.email}</td>}
            <td>
              {new Date(el.createdAt).toLocaleDateString('en-EN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </td>
            <td>
              {el.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </td>
            <td>
              {el.isPaid ? (
                <span className='has-text-primary'>
                  {dateTransf(el.paidAt)}
                </span>
              ) : (
                <span className='has-text-danger'>NOT PAID</span>
              )}
            </td>
            <td>
              {el.isDelivered ? (
                <span className='has-text-primary'>
                  {dateTransf(el.deliveredAt)}
                </span>
              ) : (
                <span className='has-text-danger'>NOT DELIVERED</span>
              )}
            </td>
            <td>
              <Link href={`/order/${el._id}`}>
                <a className='button'>View</a>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
