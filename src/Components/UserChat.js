import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"


function UserChat({ details }) {
    const LightTheme = useSelector((state) => state.themeKey);
    return (   
           
                <div className={"usg-profile-container" + ((LightTheme) ? "" : " dark")}>

                    <div className="sc-profile-img profile-pic">
                        <h1>{details.name[0]}</h1>
                    </div>
                    <div>
                        <h2>{details.name}</h2>
                    </div>
                </div>
    )
}

export default UserChat