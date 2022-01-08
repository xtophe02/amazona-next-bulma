import jwt from 'jsonwebtoken';

export const signToken = ({ _id, email, isAdmin }) =>
  jwt.sign({ _id, email, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
export const isAuth = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) res.status(401).send({ error: ' token not valid' });
      else req.user = decode;
      next();
    });
  } else {
    res.status(401).send({ error: 'token not provided' });
  }
};
