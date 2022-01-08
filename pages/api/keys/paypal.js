// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
handler.get(async (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
export default handler;
