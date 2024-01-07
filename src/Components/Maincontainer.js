import React, { useEffect, useState } from 'react'
import "./mystyle.css"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import Mytext from './Mytext';
import Othertext from './Othertext';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";

var socket;

function Maincontainer() {
  const LightTheme = useSelector((state) => state.themeKey);
  const dyParams = useParams()
  const [chatId, chatName,username] = dyParams.id.split("&");
  const [chats, setChats] = useState([]);
  const [messageCopy, setmessageCopy] = useState([]);
  const user = localStorage.getItem("myUser");
  const [data, setData] = useState({ content: "" });
  const [loading, setLoading] = useState(false);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const getMessage = async () => {
    try {
      const data = { chatId: chatId }
      setLoading(true);
      const response = await fetch("http://localhost:5000/message/allMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),//getting news from local storage
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();//storing the response of api in variable json
      setLoading(false);
      setChats(json.allMessage)//storing the saved news in news variable 
      setmessageCopy(json.allMessage);
      socket.emit("join chat", chatId);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  const sendMessage = async (content) => {
    try {
      let data = { chatId, content };
      const response = await fetch("http://localhost:5000/message/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      socket.emit("new message", json);

    } catch (error) {
      console.log(error);
    }
  }

  const sendmessage = (e) => {
    e.preventDefault();
    setData({ content: "" })
    sendMessage(data.content);
    getMessage()
  }

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("setup", username);
    socket.on("connection", () => {
      setSocketConnectionStatus(true);
    })
  }, [])

  useEffect(() => {
    socket.on("message recieved", (data) => {
      getMessage();
    })
  })


  useEffect(() => {
    getMessage();
  }, [dyParams])

  return (
    <AnimatePresence>
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ ease: "anticipate", duration: 0.25 }} className='maincontainer-container'>
        <div className={"mc-header" + ((LightTheme) ? "" : " dark")}>
          <div className='mc-sc-container'>
            <div className='sc-info'>
              <div className="sc-profile-img profile-pic">
                <h1>{chatName === "sender" ? "U" : chatName[0]}</h1>
              </div>
              <div>
                <h2>{chatName === "sender" ? "User" : chatName}</h2>
                <p>online</p>
              </div>
            </div>
            <div className='sc-time'>
              <IconButton>
                <DeleteForeverIcon className={(LightTheme) ? "" : " dark"} />
              </IconButton>
            </div>
          </div>
        </div>
        <div className={"mc-content" + ((LightTheme) ? "" : " dark")}>
          {chats.map((e) => {
            return (e.sender._id === user ? <Mytext content={e.content} time={e.time} /> : <Othertext content={e.content} name={e.sender.name} time={e.time} />)
          })}
        </div>
        <form className={"mc-inputarea" + ((LightTheme) ? "" : " dark")} onSubmit={sendmessage}>
          <input type="text" placeholder='Type message here' id='mc-search-input' name='content' value={data.content} onChange={onChange} />
          <IconButton type='submit'>
            <SendIcon className={(LightTheme) ? "" : " dark"} />
          </IconButton>

        </form>
      </motion.div>
    </AnimatePresence>
  )
}

export default Maincontainer