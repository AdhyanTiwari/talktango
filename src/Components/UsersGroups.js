import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import image from "./images/chat.png"
import UserGroupsChat from './UserGroupsChat';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function UsersGroups() {
  const navigate = useNavigate();
  const LightTheme = useSelector((state) => state.themeKey);
  const [users, setusers] = useState([]);

  const [loading, setLoading] = useState(false);
  const getGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://talktangobackend1.onrender.com/chat/fetchGroup", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")//getting news from local storage
        }
      })
      const json = await response.json();//storing the response of api in variable json
      setLoading(false);
      setusers(json)//storing the saved news in news variable 
    } catch (error) {
      console.log(error)
      setLoading(false);
      navigate("/signup") //using this we can navigate to an url from a react function
    }
  }

  useEffect(() => {
    getGroups();
  }, [])

  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0, scale: 0 }}
        transition={{ease:"anticipate",duration:0.25}}
        className='usg-container'>
        <div className={"usg-header" + ((LightTheme) ? "" : " dark")}>
          <div className='usg-img'>
            <img src={image} alt="" />
          </div>
          Available Groups
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
            return (<UserGroupsChat details={dets} key={dets.name} />)
          })}
        </div>
      </motion.div >
    </AnimatePresence>
  )
}

export default UsersGroups