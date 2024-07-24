const { default: axios } = require('axios');

const sendMessageToCognigy = async (message) => {
    try {
        console.log({ message })
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
            return res.status(400).json({
                success: false,
                message: 'Please provide valid message.',
                data: null,
            });
        }
        const reply = await sendMessageToCognigy(req.body.message)
        return res.status(200).json({
            success: false,
            message: 'Reply',
            data: reply?.text,
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
            data: null,
        });
    }
}

module.exports = {
    sendAndReceiveMessage
}