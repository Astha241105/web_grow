import React from 'react'
import "./filter.css"

const Filter = () => {
  return (
    <div id="filter-by">
      <div id="filter-by-1">
      <select id="dropdown-event" defaultValue="">
        <option value="hackathon" disabled>
          Hackathon
        </option>
        <option value="seminar">Seminar</option>
        <option value="webinar">Webinar</option>
        <option value="quiz">Quiz</option>
      </select>
      <select id="dropdown-event" defaultValue="">
        <option value="" disabled>
          Event-type
        </option>
        <option value="offline">Offline</option>
        <option value="online">Online</option>
      </select>
    </div>
    </div>
  )
}

export default Filter
