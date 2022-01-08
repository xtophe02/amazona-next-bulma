// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../../lib/dbConnect';
import { isAuth } from '../../../../utils/auth';
import nc from 'next-connect';
import User from '../../../../models/User';

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
  const _id = req.body._id;
  delete req.body._id;
  const user = await User.findOneAndUpdate(
    { _id },
    {
      ...req.body,
    },
    { new: true }
  );
  // console.log('API', order);
  res.status(201).json(user);
});

export default handler;
