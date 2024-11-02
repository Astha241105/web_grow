import React, { useState } from 'react';
import './otpWithPhone.css';

const OtpWithPhone = () => {
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
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);
  };

  return (
    <div id="contout2">
      <div id="container2">
        <h1 id="codephone">Enter the code</h1>
        <p id="mess2">Enter the 4-digit OTP we have sent to XXXXXXX521.</p>

        <div>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              className="boxes2"
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <button id="verify2" onClick={handleVerify}>
          Verify
        </button>

        <div className="didnt2">
          <span>Didn't receive the code?</span>
          <span id="gradient2"> Resend code.</span>
        </div>
      </div>
    </div>
  );
};

export default OtpWithPhone;
