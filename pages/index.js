import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import Products from '../components/Products/Products';
import { getAllProducts } from '../utils/fetchData';

const buildParams = (values) => {
  const params = {};
  if (values.page) {
    params.page = values.page;
  }
  if (values.text) {
    params.text = values.text;
  }
  if (values.category) {
    params.category = values.category;
  }
  return params;
};

const fetchDataCall = async (state) => {
  const params = buildParams(state);
  const { data } = await axios.get('/api/product/search/', {
    params,
  });
  return data;
};

export default function HomePage({ products, countProducts }) {
  const initialState = {
    products,
    text: '',
    page: 1,
    pageCount: countProducts,
    category: '',
    categories: products.reduce(
      (acc, val) => {
        // console.log(acc, val.category);
        if (acc.indexOf(val.category.toLowerCase().trim()) === -1) {
          return [...acc, val.category];
        }
        return acc;
      },

      []
    ),
  };
  const [state, setState] = useState(initialState);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchDataCall(state);
      setState((prev) => ({
        ...prev,
        products: data.products,
        pageCount: data.countProducts,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataCall(state);
      setState((prev) => ({
        ...prev,
        products: data.products,
        pageCount: data.countProducts,
      }));
    };

    fetchData();
  }, [state.page, state.category]);
  return (
    <Layout title='home'>
      <section className='section'>
        <div
          className='block'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <h1 className='title'>Products</h1>
          <div className='field has-addons'>
            <p className='control'>
              <span className='select'>
                <select
                  onChange={(e) => {
                    setState((prev) => ({ ...prev, category: e.target.value }));
                  }}
                  value={state.category}
                >
                  <option value=''>category</option>
                  {state.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </span>
            </p>
            <div className='control has-icons-right'>
              <input
                className='input'
                type='text'
                placeholder='Find a product '
                value={state.text}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, text: e.target.value }))
                }
              />
              <span
                className='icon is-small is-right'
                onClick={(e) => setState((prev) => initialState)}
              >
                <i className='fas fa-times is-clickable has-text-danger'></i>
              </span>
            </div>
            <div className='control'>
              <a className='button is-info' onClick={handleSearch}>
                Search
              </a>
            </div>
          </div>
        </div>

        <Products products={state.products} />
        <Pagination
          countProducts={state.pageCount}
          state={state}
          setState={setState}
        />
      </section>
    </Layout>
  );
}
export async function getStaticProps(context) {
  // const { data } = await axios.get(`${process.env.API_URL}/api/products`);
  const { products, countProducts } = await getAllProducts();

  return {
    props: { products: JSON.parse(products), countProducts },
    revalidate: 10,
  };
}
