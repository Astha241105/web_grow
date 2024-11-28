import React from 'react';
import "./imgoption.css";

const Imgoption = ({ onImageClick }) => {
  return (
    <div id="img-options">
      <img className="img-option" src="pro1.svg" alt="Option 1" onClick={() => onImageClick('./pro1.svg')} />
      <img className="img-option" src="pro2.svg" alt="Option 2" onClick={() => onImageClick('./pro2.svg')} />
      <img className="img-option" src="pro3.svg" alt="Option 3" onClick={() => onImageClick('./pro3.svg')} />
      <img className="img-option" src="pro4.svg" alt="Option 4" onClick={() => onImageClick('./pro4.svg')} />
      <img className="img-option" src="pro5.svg" alt="Option 5" onClick={() => onImageClick('./pro5.svg')} />
      <img className="img-option" src="pro6.svg" alt="Option 6" onClick={() => onImageClick('./pro6.svg')} />
    </div>
  );
}

export default Imgoption;
