import React from 'react';
import { useSelector } from "react-redux";

function Mytext({ content, time }) {
    const LightTheme = useSelector((state) => state.themeKey);
    const formattedTime = new Date(time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata', // Indian Standard Time
    });
    return (
        <div className='mytext' >
            <div className={"mytext-container" + ((LightTheme) ? "" : " dark-mytxt")}>
                <div className='mt-text'><p>{content} </p></div>
                <div className='mt-time'>{formattedTime}</div>
            </div>
        </div>
    )
}

export default Mytext