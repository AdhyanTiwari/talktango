import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"


function UserGroupsChat({ details }) {
    const LightTheme = useSelector((state) => state.themeKey);
    return (   
            <motion.div
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }} >
                <div className={"usg-profile-container" + ((LightTheme) ? "" : " dark")}>

                    <div className="sc-profile-img profile-pic">
                        <h1>{details.chatName[0]}</h1>
                    </div>
                    <div>
                        <h2>{details.chatName}</h2>
                    </div>
                </div>
            </motion.div>
    )
}

export default UserGroupsChat