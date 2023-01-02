// import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("")
  
  useEffect(() => {
    const friendId = conversation.members.map(Number).find((m) => m !== currentUser.id)
    
    const getUser = async () => {
      try {
        // get conversations
        const resFriend = await fetch(
          "http://localhost:8000/users?userId=" + friendId,
          {
            method: "GET"
          }
        )
        const parseResUser = await resFriend.json()
        // console.log(parseResUser[0].username)
        // setUser(parseResUser[0].username)
        setUser(parseResUser[0])
  
        //profile pic
        const resAvatar = await fetch(
          "http://localhost:8000/photos/avatar1s?id=" + friendId,
          {
            method: "GET"
          }
        )
        const parseResAvatar = await resAvatar.json()
        setAvatar(`http://localhost:8000/img/${parseResAvatar}`)
      } catch (err) {
        console.log(err);
      }
    };
    getUser()
  }, [conversation, currentUser]);
  
  // console.log(user)
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          avatar?
           avatar : "https://secure.gravatar.com/avatar/36e59b2d168a96ba0d0046b45fb0fa5f?s=500&d=mm&r=g"
        }
        alt=""
      />
      {/* <img className="conversationImg" src={avatar} alt=""/> */}
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}