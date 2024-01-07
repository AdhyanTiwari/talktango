import React from 'react'
import "./mystyle.css"
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

function SidebarChat({ props, myUser }) {
    const defaultMessage = "No previous convo! Start a new one"
    const navigate = useNavigate();
    return (
        <>
            <div className='sc-info'>
                <div className="sc-profile-img profile-pic">
                    <h1>{props.isGroupChat ? props.chatName[0] : props.users.filter((e) => { return e._id !== myUser })[0].name[0]}</h1>
                </div>
                <div>
                    <h2>{props.isGroupChat ? props.chatName : props.users.filter((e) => { return e._id !== myUser })[0].name}</h2>
                    <p>{props.latestMessage ? props.latestMessage.content.substring(0, 20) : defaultMessage.substring(0,30)}</p>
                </div>
            </div>
            <div className='sc-time'>
                {props.timestamp}
            </div>
        </>
    )
}

export default SidebarChat