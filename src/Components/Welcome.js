import React from 'react'
import image from "./images/chat.png"
import { useSelector } from "react-redux";
function Welcome() {
  const LightTheme = useSelector((state) => state.themeKey);
    return (
        <div className={"welcome-container" + ((LightTheme) ? "" : " dark-bg")}>
            <div className='welcome-text'>
                <b>TalkTango!</b>
            </div>
            <div className='welcome-img'>
                <img src={image} alt="" />
            </div>
            <div className='welcome-text'>
                <span>Start Chatting with your friends </span>
            </div>
        </div>
    )
}

export default Welcome