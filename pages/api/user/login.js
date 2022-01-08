// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import bcryptjs from 'bcryptjs';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import { signToken } from '../../../utils/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      await dbConnect();
      const user = await User.findOne({ email });

      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = signToken(user);

        return res.status(200).json({
          token,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          _id: user._id,
        });
      }
      res.status(401).json({ error: 'invalid credentials' });
    } catch (error) {
      res.status(500).json({ error: 'Cannot connect to database' });
    }
  } else {
    res.status(500).json({ error: 'no other methods allowed than get' });
  }
}
