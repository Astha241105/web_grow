import React from 'react'
import "./eventname.css"
import ii1 from "./Vector.png"
import ii2 from "./Vector1.png"
import ii3 from "./Group1.png"

const Eventname = () => {
  return (
    <div id="eventname-back">
      <div id="name-of-event">UX Hackathon</div>
      <div id="institute"><img className="event-name-images"src={ii1}></img><div className="eventname-text">Ajay Kumar Garg Engineering College</div></div>
      <div id="type-event"><img src={ii2}></img><div className="eventname-text">Technofest 2024</div></div>
      <div id="location"><img src={ii3}></img><div className="eventname-text">Ghaziabad,India</div ></div>
      <div id="event-skill">Designing</div>
      <div></div>

    </div>
  )
}
export default Eventname
