import { useRouter } from 'next/router';

export default function Price({ cart, user }) {
  const router = useRouter();

  const calcItems = () => {
    return cart.reduce((acc, val) => {
      acc += Number(val.quantity);
      return acc;
    }, 0);
  };
  const calcTotal = () => {
    return cart.reduce((acc, val) => {
      acc += Number(val.quantity) * Number(val.price);
      return acc;
    }, 0);
  };
  return (
    <div className='box'>
      <p className='is-size-5 mb-3 has-text-weight-bold'>Cart: {cart.length}</p>
      <p className='is-size-5 mb-3 has-text-weight-bold'>
        Items:
        {calcItems()}
      </p>

      <p className='is-size-5 mb-3 has-text-weight-bold'>
        Total: $
        {calcTotal()
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </p>

      <button
        className='button is-fullwidth is-primary is-uppercase has-text-weight-bold'
        disabled={!!!user}
        onClick={() => router.push('/shipping')}
      >
        Checkout
      </button>
    </div>
  );
}
