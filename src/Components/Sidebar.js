import React, { useEffect, useState } from "react";
import "./mystyle.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/Add';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import SearchIcon from '@mui/icons-material/Search';
import { Container, IconButton } from '@mui/material';
import SidebarChat from './SidebarChat';
import { useNavigate } from "react-router-dom";
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../Features/themeSlice";
import { motion } from "framer-motion"
import LogoutIcon from '@mui/icons-material/Logout';


function Sidebar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LightTheme = useSelector((state) => state.themeKey);

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/")
  }
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myUser, setMyUser] = useState("");

  const fetchChat = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://talktangobackend1.onrender.com/chat/fetchChat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")//getting news from local storage
        }
      })
      const json = await response.json();//storing the response of api in variable json
      setLoading(false);
      setConversation(json.myChat)//storing the saved news in news variable 
      setMyUser(json.myUser);
    } catch (error) {
      console.log(error)
      setLoading(false);
      navigate("/signup") //using this we can navigate to an url from a react function
    }
  }

  useEffect(() => {
    fetchChat();
  }, [])


  return (
    <div className='sidebar-container'>
      <div className={"sb-header" + ((LightTheme) ? "" : " dark")}>
        <div className="sb-header-account">
          <IconButton >
            <AccountCircleIcon className={(LightTheme) ? "" : " dark"} />
          </IconButton>
        </div>
        <div className="sb-header-rest">
          <IconButton onClick={() => { navigate("users") }}>
            <PersonAddAlt1Icon className={(LightTheme) ? "" : " dark"} />
          </IconButton>

          <IconButton onClick={() => { navigate("groups") }}>
            <GroupAddIcon className={(LightTheme) ? "" : " dark"} />
          </IconButton>

          <IconButton onClick={() => { navigate("create-groups") }}>
            <AddIcon className={(LightTheme) ? "" : " dark"} />
          </IconButton>

          <IconButton onClick={() => { dispatch(toggleTheme()) }}>
            {LightTheme && <NightsStayIcon />}
            {!LightTheme && <LightModeIcon className={(LightTheme) ? "" : " dark"} />}
          </IconButton>

          <IconButton onClick={() => { logout() }}>
            <LogoutIcon className={(LightTheme) ? "" : " dark"} />
          </IconButton>

        </div>
      </div>
      <div className={"sb-search" + ((LightTheme) ? "" : " dark")}>

        <IconButton>
          <SearchIcon className={(LightTheme) ? "" : " dark"} />
        </IconButton>

        <input type="text" placeholder='Search' id='sb-search-input' />

      </div>
      <div className={"sb-conversation" + ((LightTheme) ? "" : " dark")}>
        {
          conversation.map((convo) => {
            return (
              <motion.div
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.99 }} className={'sc-container' + ((LightTheme) ? "" : " dark")} onClick={() => { navigate("chat/" + convo._id + "&" + convo.chatName + "&" + myUser) }}>
                <SidebarChat props={convo} myUser={myUser} key={convo._id} />
              </motion.div>)

          })
        }

      </div>
    </div>
  )
}

export default Sidebar