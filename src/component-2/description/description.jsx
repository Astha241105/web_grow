import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./description.css";
import ib from "./eclipse-des.png";
import { fetchEventsPublic } from '../../components/store/slices/publicevents';

const Des = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allEvents = useSelector((state) => state.events.events);
  console.log(allEvents)

  useEffect(() => {
    dispatch(fetchEventsPublic());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = allEvents.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, allEvents]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleResultClick = (eventId) => {
    navigate('/event', { state: { eventId } });
  };

  return (
    <div className="home-des">
      <div id="home-des-inside">
        <div id="home-des-inside-1">
          Discover Unforgettable&nbsp;
          <span className="des-span" style={{ fontWeight: 600 }}>
            Experience&nbsp;
          </span>
          At Spectacular&nbsp;
          <span className="des-span" style={{ fontWeight: 600 }}>
            Events
          </span>
        </div>
        <input
          id="home-search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {filteredResults.length > 0 && (
          <ul className="search-results">
            {filteredResults.map((event) => (
              <li
                key={event.id}
                className="search-result-item"
                onClick={() => handleResultClick(event.id)}
              >
                {event.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <img id="eclipse" src={ib} alt="Eclipse" />
      <img id="ia" src="/group2.png" alt="Event illustration" />
    </div>
  );
};

export default Des;
