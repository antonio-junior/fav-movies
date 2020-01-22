const port = process.env.PORT || 3003;
const heroku = process.env.HEROKU;

const bodyParser = require('body-parser');
const express = require('express');

const server = express();
const allowCors = require('./cors');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);

if (heroku) {
  server.use(express.static('/app/frontend/public'));
  server.use(express.static('/app/frontend/dist'));

  server.get('/', (req, res) => {
    res.sendFile('index.html', { root: '/app/frontend/public' });
  });
}

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server;
