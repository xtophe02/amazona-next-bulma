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
handler.put(async (req, res) => {
  await dbConnect();
  // console.log('REQBODY', req.body);
  const order = await Order.findOneAndUpdate(
    { _id: req.query.id },
    {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: req.body.id,
        status: req.body.status,
        email_address: req.body.payer.email_address,
      },
    },
    { new: true }
  );
  // console.log('API', order);
  res.status(201).json(order);
});

export default handler;
