const axios = require('axios');
const jwt = require('jsonwebtoken');

const getTokenChecker = (provider, token) => {
  const providers = {
    facebook: {
      URL: `https://graph.facebook.com/me?access_token=${token}`,
      method: 'post',
      header: '',
    },
    google: {
      URL: `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      method: 'post',
      header: '',
    },
    github: {
      URL: 'https://api.github.com/user',
      method: 'get',
      header: `Bearer ${token}`,
    },
  };

  return providers[provider];
};

const login = (req, res) => {
  const id = req.body.id || '';
  const email = req.body.email || '';
  const outToken = req.body.outToken || '';
  const provider = req.body.provider || '';

  const tokenChecker = getTokenChecker(provider, outToken);

  axios[tokenChecker.method](tokenChecker.URL, {
    headers: { Authorization: tokenChecker.header },
  })
    .then(response => {
      if (response.data.id || response.data.success || !response.data.error) {
        const user = { id, email };

        const token = jwt.sign(user, process.env.AUTH_SECRET, {
          expiresIn: '1 day',
        });
        return res.json({ token });
      }
      return res
        .status(400)
        .send({ errors: ['error validating access_token'] });
    })
    .catch(err => {
      return res.status(400).send({ errors: [err.response.data.error] });
    });
};

const validateToken = (req, res, next) => {
  const { originalUrl } = req;

  if (!originalUrl.startsWith('/api/favmovies')) {
    return next();
  }

  const { authorization, owner } = req.headers;
  if (!authorization || !owner) {
    return res.status(401).json({ message: 'Missing required Header params' });
  }

  const token = authorization.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  try {
    const user = jwt.verify(token, process.env.AUTH_SECRET);
    if (user.email !== owner)
      return res
        .status(401)
        .json({ message: 'Requested resource does not match owner' });
  } catch (e) {
    return res.status(401).json({ e });
  }

  return next();
};

module.exports = { login, validateToken };
