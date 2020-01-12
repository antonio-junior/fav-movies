const port = process.env.PORT || 3003

const path = require('path');
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);

server.use(express.static('/app/frontend/public'));
server.use(express.static('/app/frontend/dist'));

// send the user to index html page
server.get('/', (req, res) => {
  res.sendFile('index.html', { root: "../app/frontend/public"});
});

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server;
