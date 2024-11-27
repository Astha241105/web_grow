import React, { useState, useEffect } from 'react';
import { selectedCategory, setSelectedCategory } from '../selected.js'; 
import './filter.css';

const EventType = () => {
  const [category, setCategory] = useState(selectedCategory);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value); 
    setSelectedCategory(event.target.value); 
  };

  return (
    <div id="filter-by">
      <div id="filter-by-1">
        <select
          id="dropdown-event"
          value={category} 
          onChange={handleCategoryChange}
        >
          <option value="quizzes">Quizzes</option>
          <option value="hackathons">Hackathons</option>
          <option value="webinars">Webinars</option>
          <option value="seminars">Seminars</option>
        </select>
        <select id="dropdown-event">
          <option value="" disabled>
            Event-type
          </option>
          <option value="offline">Offline</option>
          <option value="online">Online</option>
        </select>
      </div>
    </div>
  );
};

export default EventType;
