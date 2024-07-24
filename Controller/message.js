const { default: axios } = require('axios');
const RequestHandler = require('../utils/requestHandler');
const requestHandler = new RequestHandler();

const sendMessageToCognigy = async (message) => {
    try {
        console.log({ message })
        console.log(process.env.API_URL)
        const { data } = await axios.post(process.env.API_URL, {
            userId: "user_id",
            sessionId: "89652222551452",
            text: message,
            data: {
                "key": "value"
            }
        })
        console.log({ data })
        return data
    }
    catch (e) {
        return {
            text: e.message
        }
    }
}

const sendAndReceiveMessage = async (req, res) => {
    try {
        if (!req.body.message) {
            return requestHandler.sendErrorMsg(
                res,
                'Please provide valid message.',
                400,
            );
        }
        const reply = await sendMessageToCognigy(req.body.message)
        return requestHandler.sendSuccess(
            res,
            'Reply',
            reply?.text,
            200,
        );
    }
    catch (e) {
        return requestHandler.sendErrorMsg(
            res,
            e.message,
            500
        );
    }
}

module.exports = {
    sendAndReceiveMessage
}