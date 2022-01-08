import Image from 'next/image';
import Link from 'next/link';
import { useDispatchStateContext } from '../context/stateContext';

export default function Cart({ cart }) {
  const dispatch = useDispatchStateContext();
  return cart.length <= 0 ? (
    <p className='is-size-4 is-capitalized'>
      no items found on the cart, please to go shopping{' '}
    </p>
  ) : (
    <table className='table is-fullwidth'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {cart.map((item) => (
          <tr key={item._id}>
            <td>
              <Image src={item.image} alt={item.name} width={80} height={80} />
            </td>
            <td className='is-capitalized'>
              <Link href={`/product/${item.slug}`}>
                <a>{item.name}</a>
              </Link>
            </td>
            <td>{item.quantity}</td>
            <td>
              ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </td>
            <td>
              <div className='field has-addons'>
                <p className='control'>
                  <button
                    className='button '
                    onClick={() =>
                      dispatch({ type: 'ADD_ITEM_CART', payload: item })
                    }
                  >
                    <span className='icon '>
                      <i className='far fa-lg fa-plus-square'></i>
                    </span>
                  </button>
                </p>
                <p className='control'>
                  <button
                    className='button '
                    onClick={() =>
                      dispatch({ type: 'REMOVE_ITEM_CART', payload: item })
                    }
                  >
                    <span className='icon '>
                      <i className='far fa-lg fa-minus-square'></i>
                    </span>
                  </button>
                </p>
                <p className='control'>
                  <button
                    className='button'
                    onClick={() =>
                      dispatch({ type: 'CART_REMOVE', payload: item._id })
                    }
                  >
                    <span className='icon '>
                      <i className='far fa-lg fa-trash-alt'></i>
                    </span>
                  </button>
                </p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
