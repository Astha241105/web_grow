import React from 'react'
import "../browsebycategory/browsebycategory.css"
import i1 from "../browsebycategory/quiz.png"
import i2 from "../browsebycategory/hack.png"
import i3 from "../browsebycategory/webinar.png"
import i4 from "../browsebycategory/meeting.png"

const Browsebycategory = () => {
  return (
    <div id="home-browse-by-category">
        <div id="home-browse-by-category-head">Browse By Category :</div>
        <div  id="home-browse-by-category-content">
            <div className='home-browse-by-category-content-box-1 home-browse-by-category-content-box'>
                <img src={i1} className='home-browse-by-category-content-box-img'></img>
                <div className='home-browse-by-category-content-box-name'>QUIZZES</div>
                <button className="home-browse-by-category-content-box-button">View More</button>
            </div>
            <div className='home-browse-by-category-content-box-2 home-browse-by-category-content-box'>
             <img src={i2} className='home-browse-by-category-content-box-img'></img>
             <div className='home-browse-by-category-content-box-name'>HACKATHONS</div>
                <button className="home-browse-by-category-content-box-button">View More</button>
            </div>
            <div className='home-browse-by-category-content-box-3 home-browse-by-category-content-box'>
             <img src={i3} className='home-browse-by-category-content-box-img'></img>
             <div className='home-browse-by-category-content-box-name'>WEBINARS</div>
                <button className="home-browse-by-category-content-box-button">View More</button>
            </div>
            <div className='home-browse-by-category-content-box-4 home-browse-by-category-content-box'>
             <img src={i4} className='home-browse-by-category-content-box-img'></img>
             <div className='home-browse-by-category-content-box-name'>SEMINARS</div>
                <button className="home-browse-by-category-content-box-button">View More</button>
            </div>
            
        </div>
      
    </div>
  )
}

export default Browsebycategory
