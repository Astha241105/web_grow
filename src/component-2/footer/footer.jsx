import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <div id="home-footer">
        <img id="logo-in-footer" src="/logo.svg"></img>
        <div id="footer-categories">
            <div id="footer-categories-head">Categories</div>
            <div className="footer-categories-head-options">Quiz</div>
            <div className="footer-categories-head-options">Hackathon</div>
            <div className="footer-categories-head-options">Seminar</div>
            <div className="footer-categories-head-options">Webinar</div>
        </div>
        <div id="footer-company">
            <div id="footer-company-head">Company</div>
            <div className="footer-categories-head-options">About</div>
            <div className="footer-categories-head-options">Join Us</div>
        </div>
        <div id="footer-companies"></div>
      
    </div>
  )
}

export default Footer
