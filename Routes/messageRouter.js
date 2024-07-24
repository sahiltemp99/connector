const express = require('express');
const { sendAndReceiveMessage } = require('../Controller/message');

const messageRouter = express.Router();

messageRouter.post('/', sendAndReceiveMessage)

module.exports = {
    messageRouter,
};
