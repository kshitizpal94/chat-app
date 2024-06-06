import { useEffect, useState } from "react"
import { GetRequest, baseURL } from "../Utils/services";

export const useFetchRecipientUser = (chat, user)=>{
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    const recipientID = chat?.members?.find((id)=> id !== user?.id);
    // console.log('usefetchRecipient',user,chat,recipientID);
    // console.log('recipientID',recipientID,chat);
    useEffect(()=>{
        const getUser = async()=>{
            setRecipientUser(null);
            if(!recipientID) return null;
            const response = await GetRequest(`${baseURL}/user/find/${recipientID}`);
            if(response.err){
                return setError(response);
            }
            setRecipientUser(response)
            // console.log('useEffect ran');
        }

        getUser();
    },[recipientID])
    return {recipientUser};
}