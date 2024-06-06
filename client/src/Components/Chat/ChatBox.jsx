import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { ChatContext } from '../../Context/ChatContext';
import { useFetchRecipientUser } from '../../Hooks/useFetchRecipient';
import { Button, Stack } from 'react-bootstrap';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import send from '../../assets/send.svg'

const ChatBox = () => {
    const [textMessage, setTextMessage] = useState('')
    const { user } = useContext(AuthContext);
    const { currentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendMessage, } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);

    // To scroll down we can use useRef hook
    const scroll = useRef();
    useEffect(() => {
        scroll.current?.scrollIntoView(false);
        // console.log("useEffect Ran");
    }, [messages,]);

    // console.log('recipientUser', recipientUser);
    // console.log('text', textMessage);
    // console.log("Current Chat", currentChat);
    if (!recipientUser) return (
        <p style={{ textAlign: "center", width: "100%" }}>No Chat selected...</p>
    );
    if (isMessagesLoading) return (
        <p style={{ textAlign: "center", width: "100%" }}>Loading messages...</p>
    );
    return (
        <Stack gap={4} className='chat-box'>
            <div className="chat-header">
                <strong>{recipientUser?.name}</strong>
            </div>
            <Stack gap={3} className='messages'>
                {messages && messages.map((messages, index) =>
                    <Stack key={index} className={`${messages?.senderID === user?.id ?
                        "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}
                        ref={scroll}>
                        <span>{messages.text}</span>
                        <span className='message-footer'>{moment(messages.createdAt).calendar()}</span>
                    </Stack>
                )}
            </Stack>
            <Stack direction='horizontal' gap={3} className='chat-input flex-grow-0' onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(textMessage, user, currentChat, setTextMessage)
            }}>
                <InputEmoji value={textMessage} onChange={setTextMessage} fontFamily='nunito' borderColor='rgba(72,112,223,0.2)' />
                <Button className='send-btn' onKeyDown={() =>sendMessage(textMessage, user, currentChat, setTextMessage)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                    </svg>
                </Button>
            </Stack>
        </Stack>
    )
}

export default ChatBox
