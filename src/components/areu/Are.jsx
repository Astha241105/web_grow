import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./areu.css";

import hostImage from "../../assets/host.png";
import participantImage from "../../assets/part.png";

const Areu = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleContinue = () => {
    if (selectedOption === "Participant") {
      navigate("/create-account-participant");
    } else if (selectedOption === "Host") {
      navigate("/create-account-host");
    }
  };

  return (
    <div id="contout5">
      <img
        src="/Rectangle2.png"
        className="white-bg hidden md:block"
        alt="background"
      />

      <img src="/home.svg" alt="cross" className="cross hidden md:block" />
      <img
        src="/bgMobile.png"
        className="block md:hidden white-bgMobile"
        alt="background"
      />
      
        <img src="/areu.png" alt="logo" className="logo-99" />
  
      <div id="container3">
        <div id="inside">Are You a</div>
        <div className="radio-group">
          <div id="option1" className="op">
            <label className="radio-label">
              <input
                type="radio"
                name="options"
                value="Host"
                checked={selectedOption === "Host"}
                onChange={handleOptionChange}
                className="radioo"
              />
              Host
            </label>
            <img src={hostImage} alt="Host" className="option-image" />
          </div>
          <div id="option2" className="op">
            <label className="radio-label">
              <input
                type="radio"
                name="options"
                value="Participant"
                checked={selectedOption === "Participant"}
                onChange={handleOptionChange}
                className="radioo"
              />
              Participant
            </label>
            <img
              src={participantImage}
              alt="Participant"
              className="option-image"
            />
          </div>
        </div>

        <button id="cont3" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Areu;
