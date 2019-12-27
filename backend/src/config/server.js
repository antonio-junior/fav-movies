const port = 3003

const serverless = require('serverless-http');
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server
module.exports.handler = serverless(server);
