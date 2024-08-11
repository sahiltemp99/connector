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
        if (data?.outputStack && data?.outputStack?.length > 0) {
            // return data?.outputStack
            if (data?.outputStack?.length > 1) {
                let reply = {
                    reply_type: "MULTIPLE_TEXT",
                    data: data?.outputStack?.map(item => item.text),
                    digital_human: data?.outputStack?.map(item => item.text)
                }
                console.log(reply)
                return reply
            }
            else if (data?.outputStack[0]?.text !== null) {
                let reply = {
                    reply_type: "TEXT",
                    data: data?.outputStack[0]?.text,
                    digital_human: [data?.outputStack[0]?.data?.digitalhuman]
                }
                console.log(reply)
                return reply
            }
            else if (data?.outputStack[0]?.data?.type === 'buttons') {
                let reply = {
                    reply_type: "BUTTONS",
                    data: {
                        buttons: data?.outputStack[0]?.data?._cognigy?._default?._buttons?.buttons?.map(button => button?.title)
                    },
                    digital_human: [data?.outputStack[0]?.data?._cognigy?._default?._buttons?.text]
                }
                // console.log(reply)
                return reply
            }
            else if (data?.outputStack[0]?.data?.type === 'quickReplies') {
                let reply = {
                    reply_type: "QUICK_REPLIES",
                    data: {
                        buttons: data?.outputStack[0]?.data?._cognigy?._default?._quickReplies?.quickReplies?.map(quickReply => quickReply?.title)
                    },
                    digital_human: [data?.outputStack[0]?.data?._cognigy?._default?._quickReplies?.text]
                }
                // console.log(reply)
                return reply
            }
        }

        console.log('\n' + '-'.repeat(50) + '\n');
        return data?.outputStack
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
            data: reply,
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