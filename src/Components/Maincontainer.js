import React, { useContext, useEffect, useState } from 'react'
import "./mystyle.css"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import Mytext from './Mytext';
import Othertext from './Othertext';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import SendMessageInput from './SendMessageInput';
import axios from "axios";
import { myContext } from './Workarea';


var socket;

function Maincontainer() {
  const LightTheme = useSelector((state) => state.themeKey);
  const dyParams = useParams()
  const [chatId, chatName, username] = dyParams.id.split("&");
  const [chats, setChats] = useState([]);
  // const [messageCopy, setmessageCopy] = useState([]);
  const user = localStorage.getItem("myUser");
  const token = localStorage.getItem("token");
  const { refresh, setRefresh } = useContext(myContext);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  console.log("chats", chats)

  useEffect(() => {
    socket = io("https://talktangobackend1.onrender.com");
    socket.emit("setup", username);
    socket.on("connection", () => {
      setSocketConnectionStatus(true);
    })
  }, [])

  useEffect(() => {
    socket.on("message recieved", (data) => {
      
    })
  }, [])


  // useEffect(() => {
  //   getMessage();
  // }, [dyParams])


  useEffect(() => {
    const data = { chatId: chatId }
    // setLoading(true);
    fetch("https://talktangobackend1.onrender.com/message/allMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,//getting news from local storage
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
      .then(data => {
        setChats(data.allMessage)
        socket.emit("join chat", chatId);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, [dyParams, token, refresh]);

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
        <SendMessageInput chatId={chatId} socket={socket}/>
      </motion.div>
    </AnimatePresence>
  )
}

export default Maincontainer