const express = require('express');
const { messageRouter } = require('./messageRouter');

const Route = express.Router();

Route.use('/message', messageRouter);

module.exports = {
  Route,
};
