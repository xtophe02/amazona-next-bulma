// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';
import { data } from '../../data/data';
import User from '../../models/User';

export default async function handler(req, res) {
  try {
    await dbConnect();

    await Product.deleteMany();
    await User.deleteMany();
    await Product.insertMany(data.products);
    await User.insertMany(data.users);
    res.status(200).json({ name: 'successful seeded!!!' });
  } catch (error) {
    res.status(500).json({ error: 'Cannot connect to database' });
  }
}
