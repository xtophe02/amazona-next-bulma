// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../lib/dbConnect';

import nc from 'next-connect';
import Product from '../../../models/Product';

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end('Page is not found');
  },
});
// handler.use(isAuth);
handler.get(async (req, res) => {
  await dbConnect();

  const { page, text, category } = req.query;
  const buildQuery = () => {
    const query = {};

    if (text && text.trim() !== '') {
      query.$text = { $search: text };
      query.score = { $meta: 'textScore' };
    }
    if (!text && category && category.trim() !== '') {
      query.$text = { $search: category };
      query.score = { $meta: 'textScore' };
    }

    return query;
  };
  const query = buildQuery();
  const countProducts = await Product.find(query).countDocuments();
  const products = await Product.find(query)
    .sort({ name: 1 })
    .skip(6 * page - 6)
    .limit(6);
  // console.log('API', order);
  res.status(201).json({ products, countProducts });
});

export default handler;
