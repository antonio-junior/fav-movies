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
        const user = { id: id, email: email };
        const token = jwt.sign(user, process.env.REACT_APP_authSecret, {
          expiresIn: '1 day',
        });

        res.json({ token });
      } else {
        res.status(400).send({ errors: ['error validating access_token'] });
      }
    })
    .catch(err => {
      return res.status(400).send({ errors: [err.response.data.error] });
    });
};

const validateToken = (req, res) => {
  const token = req.body.token || '';

  jwt.verify(token, process.env.REACT_APP_authSecret, function(err) {
    return res.status(200).send({ valid: !err });
  });
};

module.exports = { login, validateToken };
