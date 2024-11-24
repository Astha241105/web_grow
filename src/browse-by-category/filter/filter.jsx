import React from 'react'
import "./filter.css"

const Filter = () => {
  return (
    <div id="filter-by">
      <select id="dropdown" defaultValue="">
        <option value="" disabled>
          Event type
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  )
}

export default Filter
