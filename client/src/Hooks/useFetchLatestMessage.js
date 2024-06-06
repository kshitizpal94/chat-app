import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../Context/ChatContext"
import { GetRequest, baseURL } from "../Utils/services";

export const useFetchLatestMessage = (chat)=>{
    const {newMessage, notifications} = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(()=>{
        const getMessages = async()=>{
            const response = await GetRequest(`${baseURL}/message/getmessages/${chat?._id}`);
            if(response.err){
                return console.log("Error getting messages...");
            }
            const lastMessage = response[response?.length - 1];
            setLatestMessage(lastMessage);
        }
        getMessages();
    },[newMessage,notifications]);

    return {latestMessage};
}