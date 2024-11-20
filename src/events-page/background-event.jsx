import React from 'react'
import "./background-event.css"

const BackgroundEvent = ({ children }) => {
  return (
    <div id="background-event">
        <div id="images-for-notify-and-profile">
      <img src="/notification.svg" id="images-for-notify-and-profile1"></img>
    <img src="/svg11.svg"></img>
    </div>{ children }
    </div>
  )
}

export default BackgroundEvent
