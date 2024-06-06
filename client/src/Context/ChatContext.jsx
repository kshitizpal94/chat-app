import { createContext, useCallback, useEffect, useState } from "react";
import { GetRequest, PostRequest, baseURL } from "../Utils/services";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState([]);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([])
    const [chatError, setChatError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // console.log('currentChat', currentChat);
    // console.log('messages', messages);
    // console.log("notifications", notifications);
    // console.log("Online Users", onlineUsers);
    const navigate = useNavigate();

    // to keep track of socket ID
    useEffect(()=>{
        const newSocket = io("http://localhost:8080")
        setSocket(newSocket);
        return ()=>{
            newSocket.disconnect();
        }
    },[user])

    //To emit event addNewUser whenever socket ID changes
    useEffect(()=>{
        if(!socket && !user) return;
        socket.emit("addNewUser", user?.id);
        socket.on("getOnlineUsers", (res)=>{
            setOnlineUsers(res);
        })
        return ()=>{
            socket.off("getOnlineUsers");
        }
    },[socket])

    // to send real time messages 
    useEffect(()=>{
        if(!socket) return;
        const recipientID = currentChat?.members?.find((id)=> id !== user?.id);
        socket.emit("sendMessage", {...newMessage, recipientID})
    }, [newMessage]);

    // To get real time messages and notifications
    useEffect(()=>{
        if(!socket && !user) return;
        socket.on("getMessages",(res)=>{
            if(currentChat?._id !== res.chatID) return;
            setMessages((prev)=> [...prev,res]);
        })

        socket.on("getNotification",(res)=>{
            const isChatOpen = currentChat?.members.some((id)=> id === res.senderID);
            if(isChatOpen){
                setNotifications((prev) => [{...res,isRead : true}, ...prev]);
            }
            else{
                setNotifications((prev)=>[res, ...prev]);
            }
        })
        return ()=>{
            socket.off('getMessages');
            socket.off("getNotification");
        }
    },[socket, currentChat])

    const markAllNotificationsAsRead =useCallback((notifications)=>{
        const mNotifications = notifications?.map((n)=>{
            return {...n , isRead : true};
        })
        setNotifications(mNotifications);
    },[])

    // click on notification and mark it as read and open that chat
    const markNotificationAsRead = useCallback((n,userChats, user, notifications)=>{
        // find chat to open 
        const desiredChat = userChats.find(chat =>{
            const chatMembers = [user.id, n.senderID];
            const isDesiredChat = chat?.members.every((member)=>{
                return chatMembers.includes(member);
            });
            return isDesiredChat;
        });

        //mark notication as read
        const mNotifications = notifications.map((el)=>{
            if(n.senderID === el.senderID){
                return {...n, isRead : true}
            }
            else{
                return el;
            }
        })
        updateCurrentChat(desiredChat);
        setNotifications(mNotifications);
    },[])

    // To mark userChat notification as read when that chat is opened
    const markThisUserNotificationAsRead = useCallback((thisUserNotifications, notifications)=>{
        // mark notification as read
        const mNotifications = notifications?.map((el)=>{
            let notification;

            thisUserNotifications?.forEach((n) => {
                if(n.senderID === el.senderID){
                    notification = {...n, isRead : true}
                }
                else notification=el;
            });
            return notification;
        });
        setNotifications(mNotifications);
    },[])

    // to get user's chat
    useEffect(() => {
        const getUserChats = async () => {
            setIsUserChatLoading(true);
            setChatError(null);
            if (user?.id) {
                const response = await GetRequest(`${baseURL}/chat/find/${user?.id}`);
                setIsUserChatLoading(false);
                if (response?.error) {
                    setChatError(response);
                    console.log(chatError);
                }
                setUserChats(response);
                // console.log(response);
            }
        }
        getUserChats();
    }, [user, notifications])

    // for potential chats
    useEffect(() => {
        const getChats = async () => {
            const response = await GetRequest(`${baseURL}/user/findall`);
            // console.log('All users',response, userChats);
            if (response.err) {
                return console.log('Error fetching users', response);
            }
            const potChats = response.filter((u) => {
                let chatAlreadyExits = false;
                // console.log(user.id);
                if (user?.id === u?._id) return false;
                if (userChats) {
                    chatAlreadyExits = userChats.some((chat) => {
                        return chat?.members?.[0] === u?._id || chat?.members?.[1] === u?._id;
                    })
                }
                return !chatAlreadyExits;
            });
            setPotentialChats(potChats);
            setAllUsers(response);
            // console.log('pot chats',potChats);
        }
        if(user)getChats();
    }, [userChats]);

    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true);
            setMessagesError(null);
            if (currentChat) {
                let chatID = currentChat._id;
                // console.log("chatID", chatID);
                const response = await GetRequest(`${baseURL}/message/getmessages/${chatID}`);
                setIsMessagesLoading(false);
                if(response.err){
                    return setMessagesError(response);
                }
                setMessages(response);
            }
        }
        getMessages()
    }, [currentChat]);

    // To set current chat
    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
        console.log("updateCurrentChat ran");
    })

    //creating chats
    const createChat = useCallback(async (firstID, secondID) => {
        const response = await PostRequest(`${baseURL}/chat/create`, JSON.stringify({ firstID, secondID }));
        // console.log('Create Chat',response);
        // console.log('User Chats in ChatContext', userChats);
        if (response.err) {
            return console.log('Error Creating chat', response);
        }
        // console.log('Chat created succesfully', arr);
        setUserChats((prev) => [...prev, response]);
        navigate('/');
    }, [userChats])

    //Send Message
    const sendMessage = useCallback(async(textMessage, sender, currentChatID, setTextMessage)=>{
        if(!textMessage) return console.log('Enter a message');
        const response =await PostRequest(`${baseURL}/message/create`, JSON.stringify({
            chatID : currentChatID,
            senderID : sender.id,
            text : textMessage
        }));
        if(response.error){
            return setSendTextMessageError(response);
        }
        setNewMessage(response);
        setTextMessage('');
        setMessages((prev)=>[...prev,response]);

    })

    return <>
        <ChatContext.Provider value={{
            userChats,
            isUserChatLoading,
            chatError,
            potentialChats,
            createChat,
            updateCurrentChat,
            messages,
            isMessagesLoading,
            messagesError,
            currentChat,
            onlineUsers,
            sendMessage,
            newMessage,
            notifications,
            allUsers,
            markAllNotificationsAsRead,
            markNotificationAsRead,
            markThisUserNotificationAsRead
        }}>
            {children}
        </ChatContext.Provider>
    </>
}