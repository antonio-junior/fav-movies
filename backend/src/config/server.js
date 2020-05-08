const port = process.env.PORT || 3003;
const heroku = process.env.HEROKU;
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors({ origin: true, credentials: true }));

if (heroku) {
  server.use(express.static('/app/frontend/public'));
  server.use(express.static('/app/frontend/dist'));

  server.get('/', (req, res) => {
    res.sendFile('index.html', { root: '/app/frontend/public' });
  });
}

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server;
