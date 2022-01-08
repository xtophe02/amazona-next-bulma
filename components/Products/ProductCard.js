import Image from 'next/image';
import Link from 'next/link';
import { useDispatchStateContext } from '../../context/stateContext';

export default function ProductCard({ product }) {
  const { name, image, price, slug } = product;
  const dispatch = useDispatchStateContext();
  return (
    <>
      <div className='card hello'>
        <Link href={`/product/${slug}`}>
          <a>
            <div className='card-image'>
              <figure className='image is-4by3'>
                <Image
                  src={image}
                  alt={name}
                  layout='fill'
                  placeholder='blur'
                  blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                />
              </figure>
            </div>
            <div className=' level card-content'>
              <div className='level-left'>
                <p className='title is-5 is-capitalized has-text-centered'>
                  {name}
                </p>
              </div>
              <div className='level-right'>
                <div className='level-left has-text-weight-bold is-size-6'>
                  ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </div>
              </div>

              <div className='level-right'></div>
            </div>
          </a>
        </Link>
        <div className='card-content'>
          <button
            className='button is-info is-outlined is-fullwidth'
            onClick={() =>
              dispatch({ type: 'ADD_ITEM_CART', payload: product })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>{' '}
      <style jsx>{`
        .hello:hover {
          box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
            rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
            rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        }
      `}</style>
    </>
  );
}
