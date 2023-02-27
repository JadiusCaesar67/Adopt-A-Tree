import "./message.css";
import { format } from "timeago.js";
import React, { useState, useEffect } from "react";

export default function Message({ message, own }) {
  const [avatar, setAvatar] = useState("")
  // console.log(own)

  useEffect(() => {
    const getAvatar = async() => {
      try {
        //profile pic
        const resAvatar = await fetch(
          "http://localhost:8000/photos/avatar1s?id=" + message.sender,
          {
            method: "GET"
          }
        )
        const parseResAvatar = await resAvatar.json()
        // console.log(parseResAvatar)
        if (!own) {
        setAvatar(`http://localhost:8000/img/${parseResAvatar}`)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getAvatar()
  }, [message, own])
  // console.log(avatar)
  return (
    <div className={own ? "message own" : "message"}>
        {
          !own? (<div className="messageTop"><img
          className="messageImg"
          src={avatar? 
            avatar: "https://secure.gravatar.com/avatar/36e59b2d168a96ba0d0046b45fb0fa5f?s=500&d=mm&r=g"} 
          alt=""/>
        <p className="messageText">{message.text}</p> 
        </div>) 
        : 
        (<div className="messageTop"><p className="messageText">{message.text}</p></div>)
        }
      <div className="messageBottom">{format(message.created_at)}</div>
    </div>
  );
}