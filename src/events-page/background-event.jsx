import React from 'react'
import "./background-event.css"
import "./event-name/eventname.css"
import "./nav-event/navEvent.css"
import "./details/stages/stages.css"
import "./details/details.css"
import "./details/Dates/dates.css"

const BackgroundEvent = () => {
  return (
    <div id="background-event">
    <div id="background-event-all-details">
    <div id="for-content-and-image">
      <div id="eventname-back">
        <div id="name-of-event">UX Hackathon</div>
        <div id="institute">
          <img className="event-name-images" src="/college.svg" alt="college" />
          <div className="eventname-text">Ajay Kumar Garg Engineering College</div>
        </div>
        <div id="type-event">
          <img className="event-name-images" src="/eventtype.svg" alt="event type" />
          <div className="eventname-text">Technofest 2024</div>
        </div>
        <div id="location">
          <img className="event-name-images" src="/location.svg" alt="location" />
          <div className="eventname-text">Ghaziabad, India</div>
        </div>
        <div id="event-updatedon">
          <div id="event-updatedon-1">Updated on:&nbsp;</div>
          <div>15</div>
        </div>
        <div id="event-skill">Designing</div>
      </div>
      <div>
        <img id="logo-of-event" src="/eventlogo.svg" alt="Event Logo" />
      </div>
    </div>
    <div id="nav-event">
      <div className='nav-event-options'>Stages & Timelines</div>
      <div className='nav-event-options'>Dates & Deadlines</div>
      <div className='nav-event-options'>Details</div>
      <div className='nav-event-options'>FAQs</div>
    </div>
    <div id="event-details">
    <div id="stages-and-timeline">
        <div id="stages-and-timeline-head">Stages and timeline</div>
        <div id="stages-and-timeline-content">
            <div id="stages-and-timeline-date">jjjjj</div>
            <div className="stages-and-timeline-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora et dolore, fugit aperiam officiis eaque id commodi in illo, pariatur corporis exercitationem vero adipisci ea, itaque non. Aliquam, maiores enim. Nobis similique vitae inventore illo exercitationem quidem repellendus quae sed enim provident ipsa, suscipit alias corrupti temporibus soluta eveniet ad labore pariatur tempore modi! Perspiciatis molestiae dolores fugit nisi, quibusdam vel exercitationem consequatur modi voluptate nostrum minus cum tempore!</div></div>
        </div>
        <div id="stages-and-timeline">
        <div  id="stages-and-timeline-head">Date and Deadline</div>
            <div className="stages-and-timeline-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto mollitia maxime, omnis porro eaque incidunt deserunt ipsum voluptatem quam fugiat debitis dolorem esse ratione accusantium consectetur quod dicta voluptatum, repellendus recusandae, accusamus hic animi? Ipsa eaque odit facilis, vel rerum et quia? Praesentium cumque, nemo incidunt impedit maiores ullam voluptatem, nesciunt voluptatum officia pariatur et. Tempora asperiores doloremque nulla odit, quis deleniti dolorem voluptas nobis voluptate, ad distinctio temporibus.</div>
        </div>
    </div>
    </div>
    <div  id="background-event-all-details-participant"></div>
    </div>
  )
}

export default BackgroundEvent
