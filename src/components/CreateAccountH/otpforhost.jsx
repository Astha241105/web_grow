import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateHostOtp } from '../store/slices/hostotp'; 
import './otpforhost.css';

const HostOtpVerification = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const email = useSelector((state) => state.host.email);
    console.log(email);
    const { status, error } = useSelector((state) => state.hostOtp);
  
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
  
    const handleVerify = () => {
      const otpValue = otp.join("");
      dispatch(validateHostOtp({ email, otp: otpValue })); 
    };
  
    useEffect(() => {
      if (status === "success") {
        navigate("/home");
      }
    }, [status, navigate]);
  
    return (
      <div id="contout">
        <div id="container1">
          <div id="codemail">Enter code</div>
          <p id="mess1">Enter the 4-digit OTP code sent to {email}.</p>
  
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              className={`boxes ${status === "failed" ? "error-border" : ""}`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
            />
          ))}
  
          <br />
          <button className="verify1" onClick={handleVerify}>
            Verify
          </button>
          {status === "loading" && <p>Validating...</p>}
          {status === "failed" && <p style={{ color: 'red' }}>OTP invalid! Please try again.</p>}
          {status === "success" && <p style={{ color: 'green' }}>OTP Verified!</p>}
  
          <br />
          <div className="didnt1">
            <span>Didn't receive the code?</span>
            <span id="gradient1"> Resend code.</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default HostOtpVerification;
  