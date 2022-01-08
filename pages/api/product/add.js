// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../lib/dbConnect';
import { isAuth } from '../../../utils/auth';
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
handler.use(isAuth);
handler.post(async (req, res) => {
  await dbConnect();
  const newProduct = new Product({ ...req.body });
  const product = await newProduct.save();
  // console.log('API', order);
  res.status(201).json(product);
});

export default handler;
