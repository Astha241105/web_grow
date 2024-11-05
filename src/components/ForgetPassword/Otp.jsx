import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpCode } from "../store/slices/forgotPasswordSlice";
import { useNavigate } from "react-router-dom";
import "../otpwithmail/OtpWithMail.css";

const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { email, isLoading, error, success } = useSelector(
    (state) => state.recovery || {}
  );

  const recoveryEmail = email || localStorage.getItem("recoveryEmail");
  console.log("Email used for OTP verification:", recoveryEmail);

  useEffect(() => {
    if (success) {
      navigate("/change-password");
    }
  }, [success, navigate]);

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

  const handleVerify = async () => {
    console.log("Starting OTP verification process");
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      alert("Please enter a complete 4-digit OTP");
      return;
    }

    try {
      await dispatch(
        verifyOtpCode({
          email: email || localStorage.getItem("recoveryEmail"),
          otp: otpValue,
        })
      ).unwrap();
      console.log("OTP verification dispatched successfully");
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  return (
    <div className="forgot-pass">
      <img src="/Rectangle2.png" className="white-bg" alt="background" />
      <img
        src="/bgMobile.png"
        className="block md:hidden white-bgMobile"
        alt="background"
      />
      <img src="/otp.svg" alt="logo" className="otp" />
      <a href="#" onClick={() => navigate("/forgot-password")}>
        <img src="back.svg" className="back" />
      </a>
      <div id="container1">
        <div id="codemail">Enter the code</div>
        <p id="mess1">
          Enter the 4-digit OTP code we have sent to{" "}
          {email || localStorage.getItem("recoveryEmail")}.
        </p>
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
            disabled={isLoading}
          />
        ))}
        <br />
        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginTop: "10px" }}
          >
            {error}
          </div>
        )}
        <button className="verify1" onClick={handleVerify} disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </button>
        <br />
        <div className="didnt1">
          <span>Didn't receive the code?</span>
          <span id="gradient1">Resend code.</span>
        </div>
      </div>
    </div>
  );
};

export default Otp;
