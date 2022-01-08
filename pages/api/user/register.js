// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import bcryptjs from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { signToken } from '../../../utils/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;
    if (password.length < 5) {
      res.status(400).json({ error: 'Password must be at least 5 chars long' });
      return;
    }
    try {
      await dbConnect();
      const hashPassword = bcryptjs.hashSync(password);

      const user = new User({ name, email, password: hashPassword });
      //NOT WORKING
      // console.log(Object.keys(user));
      // const res = user.validateSync();
      // console.log('RES', res);
      // const { message } = res.errors.password;
      // if (message) {
      //   res.status(400).json({ error: message });
      // }
      const newUser = await user.save();

      if (newUser) {
        const token = signToken(user);
        res.status(200).json({
          token,
          email: newUser.email,
          name: newUser.name,
          isAdmin: newUser.isAdmin,
          _id: newUser._id,
        });
      }
    } catch (error) {
      if (error.code === 11000) {
        res.status(500).json({ error: 'Email must be unique' });
      }
      console.log(Object.keys(error));
      console.log(error);
      res.status(500).json({ error: 'Cannot connect to database' });
    }
  } else {
    res.status(500).json({ error: 'no other methods allowed than get' });
  }
}
