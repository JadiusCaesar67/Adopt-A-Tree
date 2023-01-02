import "./message.css";
import { format } from "timeago.js";
import React, { useState, useEffect } from "react";

export default function Message({ message, own }) {
  const [avatar, setAvatar] = useState("")
  // console.log(message.sender)
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
        setAvatar(`http://localhost:8000/img/${parseResAvatar}`)
      } catch (error) {
        console.log(error.message)
      }
    }
    getAvatar()
  }, [message, own])
  
  return (
    <div className={own ? "message own" : "message"}>
        {
          !own? (<div className="messageTop"><img
          className="messageImg"
          src={avatar}
          alt=""/>
        <p className="messageText">{message.text}</p> 
        </div>) 
        : 
        (<div className="messageTop"><p className="messageText">{message.text}</p></div>)
        }
      <div className="messageBottom">{format(message.createdat)}</div>
    </div>
  );
}