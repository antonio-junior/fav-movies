const port = process.env.PORT || 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);

// the __dirname is the current directory from where the script is running
server.use(express.static(__dirname));

// send the user to index html page
server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

server.listen(port, function() {
  console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server;
