import React from 'react';
import "../down/down.css";
import i1 from "../down/online.png"
import i2 from "../down/collab.png"
import i3 from "../down/certi.png"

const Down = () => {
  return (
    <div id="home-down">
      <div className="home-down-1">
        <div className="home-down-img">
          <img src={i1} alt="Learn skills" />
        </div>
        <div className="home-down-text">
          <div className="home-down-1-head">Learn The Latest Skills</div>
          <div className="home-down-1-cont">
            Join hackathons and seminars to stay ahead in your field. In expert-led sessions, cover the latest trends and techniques.
          </div>
        </div>
      </div>

      <div className="home-down-1">
        <div className="home-down-img">
          <img src={i2} alt="Collaborate" />
        </div>
        <div className="home-down-text">
          <div className="home-down-1-head">Collaborate and Innovate</div>
          <div className="home-down-1-cont">
            Engage in collaborative projects that foster teamwork and innovation.
          </div>
        </div>
      </div>

      <div className="home-down-1">
        <div className="home-down-img">
          <img src={i3} alt="Earn certificate" />
        </div>
        <div className="home-down-text">
          <div className="home-down-1-head">Earn a Certificate</div>
          <div className="home-down-1-cont">
            Register for events and earn team badges and certificates.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Down;
