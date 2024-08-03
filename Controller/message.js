const { default: axios } = require('axios');

const sendMessageToCognigy = async (req) => {
    try {
        console.log("Message from User")
        console.log(req.body)
        const { data } = await axios.post(req.body.chatbot_url, {
            userId: req?.body?.user_id,
            sessionId: req.body.session_id,
            text: req?.body?.message,
            data: {
                "key": "value"
            }
        })
        console.log("Message from chatbot")
        console.log({ data })
        console.log('\n' + '-'.repeat(50) + '\n');
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
        if (!req.body.message || !req.body.user_id || !req.body.session_id || !req.body.chatbot_url) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid message, user_id, session_id and chatbot_url',
                data: null,
            });
        }
        const reply = await sendMessageToCognigy(req)
        return res.status(200).json({
            success: true,
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