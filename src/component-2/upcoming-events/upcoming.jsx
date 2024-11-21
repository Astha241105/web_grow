import React from 'react'
import "./upcoming.css"

const Upcoming = () => {
  return (
    <div id="home-upcomimg-events">
      <div id="home-upcomimg-events-head">Upcoming Events :</div>
      <div  id="home-upcomimg-events-content">
        <img className='home-upcomimg-events-arrow' src="/side2.svg"></img>
        <div className='home-upcomimg-events-info'>
            <img className='home-upcomimg-events-info-image'></img>
            <div className='home-upcomimg-events-info-title'>
                <div className='home-upcomimg-events-info-title1'>event title</div>
                <div className="home-upcomimg-events-button-and-like">
                    <button className="home-upcomimg-events-button">Register Now</button>
                    <img src="/like.svg"className="home-upcomimg-events-like"></img>
                </div>
            </div>
        </div>
        {/* <div></div> */}
        <img className='home-upcomimg-events-arrow' src="/side.svg"></img>
      </div>
    </div>
  )
}

export default Upcoming
