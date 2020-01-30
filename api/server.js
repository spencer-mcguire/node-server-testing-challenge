const express = require('express');

const apiRouter = require('./apiRouter');
const configureMiddleware = require('./configureMiddleware');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;
