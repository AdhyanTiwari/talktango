import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';


var socket;

function SendMessageInput({chatId}) {
    const token=localStorage.getItem("token")
  const LightTheme = useSelector((state) => state.themeKey);
    const [data, setData] = useState({ content: "" });
    useEffect(() => {
        socket = io("https://talktangobackend1.onrender.com");
    })
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const sendMessage = async (content) => {
        try {
            let data = { chatId, content };
            const response = await fetch("https://talktangobackend1.onrender.com/message/sendMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
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
        sendMessage(data.content);
        setData({ content: "" })
        // getMessage()
    }

    return (
        <form className={"mc-inputarea" + ((LightTheme) ? "" : " dark")} onSubmit={sendmessage}>
            <input type="text" placeholder='Type message here' id='mc-search-input' name='content' value={data.content} onChange={onChange} />
            <IconButton type='submit'>
                <SendIcon className={(LightTheme) ? "" : " dark"} />
            </IconButton>
        </form>
    )
}

export default SendMessageInput