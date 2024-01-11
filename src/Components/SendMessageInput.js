import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { myContext } from './Workarea';


var socket;

function SendMessageInput({ chatId, socket }) {
    const { refresh, setRefresh } = useContext(myContext);
    const token = localStorage.getItem("token")
    const LightTheme = useSelector((state) => state.themeKey);
    const [data, setData] = useState({ content: "" });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const sendmessage = (e) => {
        e.preventDefault();
        fetch("https://talktangobackend1.onrender.com/message/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({ chatId, content:data.content })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            console.log("new message", data)
            socket.emit("new message", data);
            setRefresh(!refresh)
            setData({ content: "" })

        }).catch(error => {
            console.error('Fetch error:', error);
        });

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