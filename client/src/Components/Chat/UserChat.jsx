import React, { useContext } from 'react'
import { useFetchRecipientUser } from '../../Hooks/useFetchRecipient';
import { Stack } from 'react-bootstrap';
import avatar from '../../assets/avatar.svg';
import { ChatContext } from '../../Context/ChatContext';
import { unreadNotificationsFunc } from '../../Utils/unreadNotifications';
import { useFetchLatestMessage } from '../../Hooks/useFetchLatestMessage';
import moment from "moment"

const UserChat =({chats , user}) => {
    // console.log('Chats',chats);
    const {recipientUser} = useFetchRecipientUser(chats, user);
    const {onlineUsers, notifications, markThisUserNotificationAsRead} = useContext(ChatContext);
    const { latestMessage } = useFetchLatestMessage(chats);
    // console.log('Recipient User',recipientUser);
    const unreadNotifications = unreadNotificationsFunc(notifications);

    //Notifications from this user
    const thisUserNotifications = unreadNotifications?.filter((n)=>{
       return n.senderID === recipientUser?._id;
    })

    //Is this user online
    let isOnline = onlineUsers?.some((u)=>u?.userID === recipientUser?._id);

    // To display a part of message
    const truncateMessage = (text)=>{
        let shortText = text?.substring(0,15);
        if(text?.length>15){
            shortText = shortText + "...";
        }
        return shortText;
    }

  return (
    <Stack direction='horizontal' gap={3} role='button'
    className='user-card align-items-center p-2 justify-content-between'
    onClick={()=>{
        if(thisUserNotifications?.length!==0){
            markThisUserNotificationAsRead(thisUserNotifications,notifications);
        }
    }}>
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} height='35px'/>
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">{
                    latestMessage?.text && (
                        <span>{truncateMessage(latestMessage?.text)}</span>
                    )
                }</div>
            </div>
        </div>
        <div className='d-flex flex-column align-items-end'>
            <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
            <div className={thisUserNotifications?.length>0?"this-user-notifications":""}>
                {thisUserNotifications?.length>0 ? thisUserNotifications.length : ""}
            </div>
            <span className={isOnline ? 'user-online' : ''}></span>
        </div>
    </Stack>
  )
}

export default UserChat
