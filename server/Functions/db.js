require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.URI;
const db_connect = async()=>{
    try{
        const connection = await mongoose.connect(URI);
        console.log(`Database Connected: ${connection.connection.host}`);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = db_connect;