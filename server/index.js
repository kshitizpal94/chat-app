const express = require("express");
const cors = require('cors');
const { log } = require("console");
const db_connect = require('./Functions/db');
const userRouter = require('./Routes/userRoutes');
const chatRouter = require('./Routes/chatRoutes');
const messageRouter = require('./Routes/messageRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.listen(PORT, (req, res)=>{
    log(`Running on ${PORT}`);
})
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message/', messageRouter);

db_connect();
