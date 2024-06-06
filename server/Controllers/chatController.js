const chatModal = require('../Models/chatModel');

//Create Chat

const createChat = async(req, res)=>{
    const {firstID, secondID} = req.body;
    try{
        const chat = await chatModal.findOne({
            members : {$all : [firstID, secondID]}
        })
        if(chat)    return res.status(200).json({chat});
        const newChat =await chatModal.create({
            members:[firstID, secondID]
        })
        res.status(200).json(newChat);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

// find User's chat

const findUserChats = async(req,res)=>{
    const {userID} = req.params;
    try{
        const chats = await chatModal.find({
            members : {$in:[userID]}
        });
        res.status(200).json(chats);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

// find chat 
const findChat = async(req,res)=>{
    const {firstID, secondID} = req.params;
    // console.log(firstID, secondID);
    try{
        const chat = await chatModal.find({
            members : {$all : [firstID, secondID]}
        });
        res.status(200).json(chat);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}

module.exports = {createChat, findUserChats, findChat}