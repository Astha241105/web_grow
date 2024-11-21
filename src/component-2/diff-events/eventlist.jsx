import React from 'react'
import "./eventlist.css"

const Eventlist = () => {
  return (
    <div id="eventlist">
        <div id="eventlist-options">
            <div className="eventlist-options1"><img src="/registered.svg"></img><div>Registered</div></div>
            <div className="eventlist-options1"><img src="/liked.svg"></img><div>Liked</div></div>
            <div className="eventlist-options1"><img src="/recent.svg"></img><div>Recent view</div></div>
        </div>
      
    </div>
  )
}

export default Eventlist
