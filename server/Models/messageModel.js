const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatID : String,
    senderID : String,
    text : String
},{
    timestamps:true
});

module.exports = mongoose.model('message', messageSchema);