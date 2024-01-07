import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import image from "./images/chat.png"
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import UserChat from './UserChat';


function Users() {
  const navigate = useNavigate();
  const LightTheme = useSelector((state) => state.themeKey);
  const [users, setusers] = useState([]);
  const [myUser, setMyUser] = useState("");
  const [loading, setLoading] = useState(false);
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://talktangobackend1.onrender.com/user/get-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")//getting news from local storage
        }
      })
      const json = await response.json();//storing the response of api in variable json
      setLoading(false);
      setusers(json.allUsers);
      setMyUser(json.user)
    } catch (error) {
      console.log(error)
      setLoading(false);
      navigate("/signup") //using this we can navigate to an url from a react function
    }
  }

  const getChatId = async (userid) => {
    const data = { userId: userid };
    try {
      setLoading(true);
      const response = await fetch("https://talktangobackend1.onrender.com/chat/accessChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")//getting news from local storage
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();//storing the response of api in variable json
      setLoading(false);
      navigate("/app/chat/" + json._id + "&" + json.chatName + "&" + myUser)
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  const Onclick = (id) => {
    getChatId(id);
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <AnimatePresence>
      <motion.div className='usg-container'
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0, scale: 0 }}
        transition={{ ease: "anticipate", duration: 0.25 }}>
        <div className={"usg-header" + ((LightTheme) ? "" : " dark")}>
          <div className='usg-img'>
            <img src={image} alt="" />
          </div>
          Online Users
        </div>
        <div className={"bs-search" + ((LightTheme) ? "" : " dark")}>

          <IconButton>
            <SearchIcon className={(LightTheme) ? "" : " dark"} />
          </IconButton>

          <input type="text" placeholder='Search' id='sb-search-input' />
        </div>
        <div className="usg-conversation">
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {users.map(dets => {
            return (
              <motion.div
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }} onClick={() => { Onclick(dets._id) }} >
                <UserChat details={dets} key={dets.name} />
              </motion.div>
            )
          })}
        </div>
      </motion.div >
    </AnimatePresence>
  )
}

export default Users