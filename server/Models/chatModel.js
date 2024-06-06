const mongoose = require('mongoose');

const Chat  = new mongoose.Schema({
    members : Array,
},
{
    timestamps:true
})




module.exports = mongoose.model('chats', Chat);