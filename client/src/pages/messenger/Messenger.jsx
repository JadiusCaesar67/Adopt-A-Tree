import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/messages/Message";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Messenger() {
  const [ id, setId ] = useState("")
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [ socket, setSocket ] = useState(null)
  // const socket = useRef();
  const [ user, setUser ] = useState("");
  const scrollRef = useRef(); //auto-scroll to the last page in chatbox
  // console.log(currentChat.conversation_id)
const getProfile = async () => {
  // console.log(localStorage.getItem("token"))
  try {
      const response = await fetch(
          "http://localhost:8000/profile", 
          {
              method: "GET", 
              headers: { 
                  Authorization: "Bearer " + localStorage.getItem("token")
              }
          }
      )
      const parseRes = await response.json()
      setId(parseRes.id)
      setUser(parseRes)
      // console.log(id)
        }catch (error) {
          console.log("something went wrong")
      }
  }

//   useEffect(() => {
//     socket?.on("welcome", message => {
//       console.log(message)
//     })
// }, [socket]);

  // useEffect(() => {
  //   setSocket(io("ws://localhost:5000"));
  // }, []);

  // useEffect(() => {
  // //   socket.current = io("ws://localhost:5000");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  
  // // other users couldn't see our conversation with a selected convo
  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  ////testing
  // useEffect(() => {
  //   socket.current.emit("addUser", user.id);
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  // }, [user]);

  // gather all previous conversations of each user
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/conversations/" + id, 
          {
              method: "GET"
          }
        )
        const parseRes = await response.json()
        setConversations(parseRes)
        // console.log(parseRes)
      } catch (error) {
        console.log("something went wrong")
    }
    };
    getProfile()
    // const interval = setInterval(() => {
    //   // getMessages()
    //   getConversations()
    // }, 1000);
    // return () => clearInterval(interval);
    getConversations()
  }, [id]);

  //fetch messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/messages/" + currentChat?.conversation_id, 
          {
              method: "GET"
          }
        )
        const parseRes = await response.json()
        // console.log(parseRes)
        setMessages(parseRes)
        
      } catch (err) {
        console.log(err.message);
      }
    };
    const interval = setInterval(() => {
      getMessages()
    }, 1000);
    return () => clearInterval(interval);
    // getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat.conversation_id,
    };
    
    //private messaging
    const receiverId = currentChat.members.map(Number).find(
      (member) => member !== user.id
    );
    // socket.current.emit("sendMessage", {
    //   senderId: user.id,
    //   receiverId,
    //   text: newMessage,
    // });

    try {
      const response = await fetch(
        "http://localhost:8000/messages/", 
        {
            method: "POST",
            headers: {
              "Content-type" : "application/json"
          },
          body: JSON.stringify(message)
        }
      )
        const parseRes = await response.json()
        console.log(parseRes[0].text)
      setMessages([...messages, parseRes[0].text])
      setNewMessage("")
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { //upon opening each convo autoscroll page down
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
    const delay = setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "auto" });
    }, 2000);
    return () => clearTimeout(delay);
  }, [currentChat]);
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for previous conversations" className="chatMenuInput" />
            {conversations.map((c, i) => (
              <div key={i} onClick={() => setCurrentChat(c)} >
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m , i) => (
                    <div key={i} ref={scrollRef}>
                      <Message message={m} own={m.sender === user.id}/>
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea 
                    style={{ resize : "none" }}
                    rows="4" cols="50"
                    className="chatMessageInput"
                    placeholder="Say something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  {
                    newMessage? (<button className="btn btn-outline-success" onClick={handleSubmit}>
                    Send
                  </button>):(<button className="btn btn-outline-success" disabled>
                    Send
                  </button>)
                  }
                  
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}