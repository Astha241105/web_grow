import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./description.css";
import ib from "./eclipse-des.png";


const Des = ({ events, status }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "succeeded") {
      setFilteredResults(events);
    }
  }, [status, events]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.length > 0) {
        const results = events.filter((event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredResults(results);
      } else {
        setFilteredResults([]);
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, events]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleResultClick = (eventId) => {
    navigate("/event", { state: { eventId } });
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
        {status === "loading" ? (
          <div>Loading...</div>
        ) : filteredResults.length > 0 ? (
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
        ) : searchQuery && filteredResults.length === 0 ? (
          <div className="search-results">No events found.</div>
        ) : null}
      </div>
      <img id="eclipse" src={ib} alt="Eclipse" />
      <img id="ia" src="/group2.png" alt="Event illustration" />
    </div>
  );
};

export default Des;
