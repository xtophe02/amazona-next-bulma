import Layout from '../../components/Layout';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const DynamicRatingStarts = dynamic(() => import('react-stars'), {
  ssr: false,
});

import { useRouter } from 'next/router';
import { getAllProductsSlugs, getProductSlug } from '../../utils/fetchData';
import {
  useDispatchStateContext,
  useNotificationCtx,
  useStateContext,
} from '../../context/stateContext';
import { useState } from 'react';
import axios from 'axios';

export default function SlugPage({ product }) {
  const {
    name,
    image,
    brand,
    category,
    countInStock,
    description,
    _id,
    price,
    rating,
    reviews,
  } = product;
  const [state, setState] = useState({
    loading: false,
    rat: 0,
    review: '',
    reviews,
  });
  const router = useRouter();
  const { user } = useStateContext();
  const dispatch = useDispatchStateContext();
  const { showNotification } = useNotificationCtx();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true }));
    if (!user) {
      showNotification({
        title: 'Login',
        status: 'is-danger',
        message:
          'You need to be logged in first to you can able to leave a comment',
      });
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }
    if (state.rat === 0 || state.review.trim() === '') {
      showNotification({
        title: 'No Rating',
        status: 'is-danger',
        message: 'No Rating was given!!! please to add stars and a comment',
      });
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      const { data } = await axios.post(
        '/api/product/raiting',
        {
          rating: state.rat,
          comment: state.review,
          productId: _id,
          user: user._id,
          userName: user.name,
        },
        { headers: { authorization: `Bearer ${user.token}` } }
      );

      setState((prev) => ({
        ...prev,
        reviews: data.reviews,
        loading: false,
        rat: 0,
        review: '',
      }));
    } catch (error) {
      console.log(error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Layout title={name} description={name}>
      <section className='section'>
        <button
          onClick={() => router.back()}
          className='button is-outlined is-info'
        >
          Go Back
        </button>
        <div className='columns mt-4'>
          <div className='column is-half-tablet is-full-mobile'>
            <Image
              src={image}
              width={300}
              height={350}
              layout='responsive'
              alt={name}
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
            />
          </div>
          <div className='column is-half-tablet is-full-mobile'>
            <h3 className='is-size-3 is-capitalized has-text-centered'>
              {name}
            </h3>
            <ul className='is-size-5 is-capitalized'>
              <li className='p-1'>
                <b>Category:</b> {category}
              </li>
              <li className='p-1'>
                <b>Brand:</b> {brand}
              </li>
              <li
                className='p-1'
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <a href='#customer'>
                  {state.reviews ? state.reviews.length : 0}&nbsp;Reviews
                </a>
                &nbsp;
                <DynamicRatingStarts
                  count={5}
                  // onChange={ratingChanged}
                  size={24}
                  activeColor='#ffd700'
                  value={
                    state.reviews
                      ? Math.ceil(
                          state.reviews.reduce(
                            (acc, val) => (acc += val.rating),
                            0
                          ) / state.reviews.length
                        )
                      : 0
                  }
                  edit={false}
                />
              </li>
              <li className='p-1'>
                <b>Description:</b> {description}
              </li>
            </ul>
            <div className='box has-text-centered is-size-5 has-background-primary-light'>
              <p className='my-2'>
                <b>Price:</b>&nbsp;$
                {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </p>
              <p className='my-2'>
                <b>Stock:</b>&nbsp;
                {countInStock} units
              </p>
              <button
                className='is-fullwidth button is-primary is-uppercase'
                onClick={() =>
                  dispatch({ type: 'ADD_ITEM_CART', payload: product })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className='block'>
          <h2 className='title is-4'>Customer Reviews</h2>
          <div className='block'>
            {state.reviews && state.reviews.length > 0 ? (
              state.reviews.map((rev) => (
                <article className='media' key={rev._id}>
                  <div className='media-left'>
                    <DynamicRatingStarts
                      count={5}
                      // onChange={ratingChanged}
                      size={24}
                      activeColor='#ffd700'
                      value={rev.rating}
                      edit={false}
                    />
                  </div>
                  <div className='media-content'>
                    <p>
                      <span className='is-capitalized has-text-weight-bold'>
                        {rev.userName}
                      </span>
                      &nbsp;
                      <small className='is-italic'>
                        {new Date(rev.createdAt).toLocaleDateString('en-en', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </small>
                    </p>
                    <p>{rev.comment}</p>
                  </div>
                </article>
              ))
            ) : (
              <p>No reviews so far... be the first</p>
            )}
          </div>
          <div className='block' id='customer'>
            <DynamicRatingStarts
              count={5}
              onChange={(rev) => setState((prev) => ({ ...prev, rat: rev }))}
              size={24}
              activeColor='#ffd700'
              value={state.rat}
            />
            <div className='field has-addons'>
              <div className='control is-expanded has-icons-left '>
                <span className='icon is-left'>
                  <i className='far fa-comments'></i>
                </span>
                <input
                  className='input'
                  type='text'
                  placeholder='Leave your review'
                  value={state.review}
                  onChange={(e) =>
                    setState((prev) => ({ ...prev, review: e.target.value }))
                  }
                />
              </div>
              <div className='control'>
                <a
                  className={`button is-primary ${
                    state.loading && 'is-loading'
                  }`}
                  onClick={handleSubmitReview}
                >
                  Submit
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export async function getStaticPaths() {
  const slugs = await getAllProductsSlugs();
  const paths = slugs.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: 'blocking', // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  const product = await getProductSlug(context.params.slug);
  return {
    props: { product: JSON.parse(product) },
    revalidate: 10,
  };
}
