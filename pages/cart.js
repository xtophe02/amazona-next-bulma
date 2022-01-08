import Layout from '../components/Layout';
// import Cart from '../components/Cart';
import { useStateContext } from '../context/stateContext';
import dynamic from 'next/dynamic';

const CartDynamic = dynamic(() => import('../components/Cart'), { ssr: false });
const PriceDynamic = dynamic(() => import('../components/Price'), {
  ssr: false,
});

export default function CartPage() {
  const { cart, user } = useStateContext();

  return (
    <Layout title='cart'>
      <section className='section'>
        <h1 className='title'>Shopping Cart</h1>
        <div className='columns'>
          <div className='column is-four-fifths'>
            <div className='box'>
              <CartDynamic cart={cart} />
            </div>
          </div>
          <div className='column'>
            <PriceDynamic cart={cart} user={user} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
