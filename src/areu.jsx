import React from 'react';
import './areu.css';

const Areu = () => {
    return (<>
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='817' height='736' viewBox='0 0 817 736' fill='none'%3E%3Cpath d='M113.557 197.139C91.6067 88.8849 171.543 0 282 0H817V736H0C169.402 544.739 145.636 355.345 113.557 197.139Z' fill='white'/%3E%3C/svg%3E" className="white-bg" alt="background" />
        <div id="container3">
            <div id="inside">Are You a</div>
            <div className="radio-group">
                <label className="radio-label">
                    <input type="radio" name="options" value="option1" className="radioo" />
                    Host
                </label>
                <br /> 
                <label className="radio-label">
                    <input type="radio" name="options" value="option2" className="radioo"/>
                    Participant
                </label>
            </div>
            <button id="cont3">Continue</button>
        </div></>
    );
};

export default Areu;
