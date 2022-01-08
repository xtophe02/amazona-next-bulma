// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { isAuth, signToken } from '../../../utils/auth';
import nc from 'next-connect';
import bcryptjs from 'bcryptjs';

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
  const _id = req.body._id;
  delete req.body._id;
  if (req.body.password) {
    const hashPassword = bcryptjs.hashSync(req.body.password);
    const user = await User.findOneAndUpdate(
      { _id },
      {
        ...req.body,
        password: hashPassword,
      },
      { new: true }
    );
    console.log(user);
    const token = signToken(user);
    res.status(200).json({
      token,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      _id: user._id,
    });
  } else {
    const user = await User.findOneAndUpdate(
      { _id },
      {
        ...req.body,
      },
      { new: true }
    );
    const token = signToken(user);
    res.status(200).json({
      token,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      _id: user._id,
    });
  }
});

export default handler;
