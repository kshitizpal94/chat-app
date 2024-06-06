const { Server } = require("socket.io");

const io = new Server({ cors:"http://localhost:3000" });

let onlineUsers = [];

io.on("connection", (socket) => {
    // console.log('New Connection to socket', socket.id);

    // Listen when new user comes online
    socket.on("addNewUser",(userID)=>{
        !onlineUsers.some((u)=> u.userID === userID) &&
            onlineUsers.push({
                userID,
                socketID : socket.id
            });
        console.log(onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    })

    // adding message 
    socket.on("sendMessage", (message)=>{
        const user = onlineUsers.find(u=> u.userID === message.recipientID);
        // User is online
        if(user){
            io.to(user.socketID).emit("getMessages", message);
            io.to(user.socketID).emit("getNotification",{
                senderID : message.senderID,
                isRead : false,
                date : new Date(),
            });
        }
    })

    socket.on("disconnect", ()=>{
        onlineUsers = onlineUsers.filter(user => user.socketID !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    })
});

io.listen(8080);