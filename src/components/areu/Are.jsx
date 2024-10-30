import React, { useState } from 'react';
import './Areu.css';

import hostImage from '../../assets/host.png'; 
import participantImage from '../../assets/part.png'; 

const Areu = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div id="contout5">
            <div id="container3">
                <div id="inside">Are You a</div>
                <div className="radio-group"><div id="option1" className="op">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="options"
                            value="Host"
                            checked={selectedOption === 'Host'}
                            onChange={handleOptionChange}
                            className="radioo"
                        />
                        Host
                    </label>
                    <img src={hostImage} alt="Host" className="option-image" /></div>
                    <div id="option2" className="op">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="options"
                            value="Participant"
                            checked={selectedOption === 'Participant'}
                            onChange={handleOptionChange}
                            className="radioo"
                        />
                        Participant
                    </label>
                    <img src={participantImage} alt="Participant" className="option-image" /></div>
                </div>

                <button id="cont3">Continue</button>
            </div>
        </div>
    );
};

export default Areu;
