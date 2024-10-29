import React from 'react';
import './areu.css';

const Areu = () => {
    return (
        <div id="container3">
            <div id="inside">Are You a</div>
            <div className="radio-group">
                <label className="radio-label">
                    <input type="radio" name="options" value="option1" className="radioo" />
                    Host
                </label>
                <br /> {/* Line break to place Participant below Host */}
                <label className="radio-label">
                    <input type="radio" name="options" value="option2" className="radioo"/>
                    Participant
                </label>
            </div>
            <button id="cont3">Continue</button>
        </div>
    );
};

export default Areu;
