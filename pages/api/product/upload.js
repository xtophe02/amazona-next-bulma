// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from '../../../lib/dbConnect';
import { isAuth } from '../../../utils/auth';
import nc from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      resolve({ fields, files });
    });
  });

  const file = data?.files?.file.filepath;

  const response = await cloudinary.uploader.upload(
    file,
    { folder: 'amazona' },
    function (error, result) {
      console.log(result, error);
    }
  );
  return res.json(response);
});

export default handler;
