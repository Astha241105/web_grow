import React, { useState } from 'react';
import "./hostnow.css";
import Loginpopup from '../login-popup/login-popup';

const Hostnow = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleHostNowClick = () => {
    setShowLoginPopup(true);
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div id="hostnow">
      <div id="hostnow-content">
        <div id="hostnow-content-head">
          <div id="hostnow-content-head1">Host an&nbsp;</div>
          <span id="hostnow-content-head2">opportunity</span>
        </div>
        <div id="hostnow-content-content">Engage with diverse talent pools or hire the best minds</div>
        <button id="hostnow-content-button" onClick={handleHostNowClick}>Host now</button>
      </div>
      <img id="hostnow-image" src="./hostnow.svg" alt="Host now" />
      
      {showLoginPopup && <Loginpopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Hostnow;