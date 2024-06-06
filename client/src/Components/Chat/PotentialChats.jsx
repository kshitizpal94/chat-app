import { useContext } from "react"
import { ChatContext } from "../../Context/ChatContext"
import { AuthContext } from "../../Context/AuthContext";

const PotentialChats = () => {
  const {user} = useContext(AuthContext);
    const {potentialChats, createChat, } = useContext(ChatContext);
    // console.log('potential chats',potentialChats);
    // console.log('User Chats', userChats);
  return (
    <div className="all-users">
        {
            potentialChats.map((chat, index)=>{
              return ( <div key={index} className="single-user" onClick={()=> createChat(user.id, chat._id)}>
                {chat.name}
              </div>)
            })
        }
    </div>
  )
}

export default PotentialChats
