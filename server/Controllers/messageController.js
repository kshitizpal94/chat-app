const messageModel = require('../Models/messageModel');

// Create Message

const createMessage = async(req, res)=>{
    const {chatID, senderID, text} = req.body;
    try{
        const newMessage =await messageModel.create({
            chatID, senderID, text
        });
        res.status(200).json(newMessage);

    }
    catch(err){
        console.log(err);
        res.status(400).json({err});
    }
}

const getMessages = async (req, res)=>{
    const { chatID } = req.params;
    try{
        const messages =await messageModel.find({chatID});
        res.status(200).json(messages);
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}

module.exports = {createMessage, getMessages}