import ProductCard from './ProductCard';
export default function Products({ products = [] }) {
  return (
    <div className='columns is-multiline'>
      {products.map((product) => (
        <div
          className='is-one-third-desktop column is-half-tablet'
          key={product._id}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
