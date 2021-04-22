const express = require('express');
const cerealRouter = require('./cereals/cereals-router');

const server = express();

server.use(express.json());

server.use('/api/cereals', cerealRouter);

module.exports = server;