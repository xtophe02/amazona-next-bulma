// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import nc from 'next-connect';

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
  const newOrder = new Order({ ...req.body, user: req.user._id });
  const order = await newOrder.save();
  res.status(201).json(order);
});

export default handler;
