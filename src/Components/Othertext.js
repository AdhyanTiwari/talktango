import React from 'react'
import { useSelector } from 'react-redux';

function Othertext({ content, name, time }) {
  const LightTheme = useSelector((state) => state.themeKey);
  const formattedTime = new Date(time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata', // Indian Standard Time
  });

  return (
    <div className='othertext' >
      <div className={"othertext-container" + ((LightTheme) ? "" : " dark-otxt")}>
        <div className='ot-user'><b>{name}</b></div>
        <div className='ot-text'><p>{content} </p></div>
        <div className='ot-time'>{formattedTime}</div>
      </div>
    </div>
  )
}

export default Othertext