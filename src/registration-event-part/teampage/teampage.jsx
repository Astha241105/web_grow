import React from 'react'
import "./teampage.css"
const Teampage = () => {
  return (
    <div id="teampage"> 
        <div id="teampage-nav">
            <div id="teampage-nav-back"><img src="/back2.svg"></img> <span          id="teampage-nav-back1">Back</span></div>
            <div id="teampage-nav-logo"></div>
            <div>
                <div id="teampage-nav-name">Name</div>
                <div id="teampage-nav-location">Loaction</div>
            </div>
        </div>
        <div id="team-details">
            <div id="team-details-1">
                <div id="my-team">My team</div>
                <div id="team-name">Team Name:</div>
                <div id="team-members">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div></div>
            </div>
        </div>
       
    </div>
  )
}

export default Teampage
