import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setSelectedCategory } from '../../browse-by-category/selected'; 
import './browsebycategory.css';
import i1 from './quiz.png';
import i2 from './hack.png';
import i3 from './webinar.png';
import i4 from './meeting.png';

const Browsebycategory = () => {

  const navigate1 = useNavigate();
  
  const handleViewMore = (category) => {
    navigate1('/event-type', { state: { category: category } });
  };

  return (
    <div id="home-browse-by-category">
      <div id="home-browse-by-category-head">
        Pick an <span id="home-browse-by-category-head-span">Opportunity</span> :
      </div>
      <div id="home-browse-by-category-content">
        <div className="home-browse-by-category-content-box-1 home-browse-by-category-content-box">
          <img src={i1} className="home-browse-by-category-content-box-img" alt="Quiz" />
          <div className="home-browse-by-category-content-box-name">QUIZZES</div>
          <button
            className="home-browse-by-category-content-box-button"
            onClick={() => handleViewMore('Quiz')}
          >
            View More
          </button>
        </div>
        <div className="home-browse-by-category-content-box-2 home-browse-by-category-content-box">
          <img src={i2} className="home-browse-by-category-content-box-img" alt="Hackathons" />
          <div className="home-browse-by-category-content-box-name">HACKATHONS</div>
          <button
            className="home-browse-by-category-content-box-button"
            onClick={() => handleViewMore('hackathon')}
          >
            View More
          </button>
        </div>
        <div className="home-browse-by-category-content-box-3 home-browse-by-category-content-box">
          <img src={i3} className="home-browse-by-category-content-box-img" alt="Webinars" />
          <div className="home-browse-by-category-content-box-name">WEBINARS</div>
          <button
            className="home-browse-by-category-content-box-button"
            onClick={() => handleViewMore('webinar')}
          >
            View More
          </button>
        </div>
        <div className="home-browse-by-category-content-box-4 home-browse-by-category-content-box">
          <img src={i4} className="home-browse-by-category-content-box-img" alt="Seminars" />
          <div className="home-browse-by-category-content-box-name">SEMINARS</div>
          <button
            className="home-browse-by-category-content-box-button"
            onClick={() => handleViewMore('seminar')}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Browsebycategory;
