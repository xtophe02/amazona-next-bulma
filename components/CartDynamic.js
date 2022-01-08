import { useStateContext } from '../context/stateContext';
import Link from 'next/link';

export default function CartDynamic() {
  const { cart } = useStateContext();
  // console.log(cart);
  return (
    <Link href='/cart'>
      <a className='navbar-item'>
        Cart&nbsp;
        <span className='has-text-weight-bold has-text-link'>
          {cart.length === 0 ? ' ' : cart.length}
        </span>
      </a>
    </Link>
  );
}
