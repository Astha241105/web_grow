import React, { useState } from 'react';
import './OtpWithMail.css';

const OtpWithMail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const { value } = e.target;


    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);


    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  
  const otpValue = otp.join("");

  return (
    <div id="contout">
      <div id="container1">
        <div id="codemail">Enter the code</div>
        <p id="mess1">Enter the 4-digit OTP code we have sent to abc@gmail.com.</p>
        
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            className="boxes"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength="1"
          />
        ))}

        <br />
        <button className="verify1" onClick={() => console.log("Entered OTP:", otpValue)}>
          Verify
        </button>
        <br />
        <div className="didnt1">
          <span>Didn't receive the code?</span>
          <span id="gradient1"> Resend code.</span>
        </div>
      </div>
    </div>
  );
};

export default OtpWithMail;
