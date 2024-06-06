import React, { useContext } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { Button, Container, Stack } from 'react-bootstrap';
import { AuthContext } from '../Context/AuthContext';
import UserChat from '../Components/Chat/UserChat';
import PotentialChats from '../Components/Chat/PotentialChats';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../Components/Chat/ChatBox';

const Chat = () => {
  const {user} = useContext(AuthContext);
  const { userChats,
    isUserChatLoading,
    updateCurrentChat,
    messages,
    isMessagesLoading,
    messagesError,} = useContext(ChatContext);
    const navigate=useNavigate();
    const handleClick = ()=>{
      navigate('newchat');
    }
  // console.log('userChats', userChats);
  return (
    <div>
      <Container>
        <Button onClick={handleClick}>New Chat</Button>
        {userChats?.length < 1 ? null :(
          <>
            <Stack direction='horizontal' gap={4}
              className='align-items-start'>
                <Stack className="message-box flex-grow-0 pe-3" gap={3}>
                  {isUserChatLoading && <p>Loading Chats...</p>}
                  {userChats?.map((chats, index)=>{
                    return(
                      <div key={index} onClick={()=>updateCurrentChat(chats)}><UserChat chats={chats} user={user}/></div>
                    )
                  })}
                </Stack>
                <ChatBox/>
            </Stack>
          </>
        )}
      </Container>
    </div>
  )
}

export default Chat
