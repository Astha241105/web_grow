import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../store/slices/fpotpslice";
import { forgotPassword } from "../store/slices/ForgotPassSlice";
import { toast } from "react-toastify"; // Import toast
import "../otpwithmail/OtpWithMail.css";
import "./otp.css";


const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { email, isLoading, error, otpVerified } = useSelector(
    (state) => state.fpotp || {}
  );

  const recoveryEmail = email || localStorage.getItem("recoveryEmail");

  useEffect(() => {
    if (!recoveryEmail) {
      console.error("No recovery email found");
      navigate("/forgot-password");
    }
  }, [recoveryEmail, navigate]);

  useEffect(() => {
    if (otpVerified) {
      console.log("OTP verified successfully, navigating to change password");
      navigate("/change-password");
    }
  }, [otpVerified, navigate]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Allow only numeric values (0-9)
    if (/[^0-9]/.test(value)) return;

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
    const otpValue = otp.join("");

    console.log("Starting OTP verification with:", {
      email: recoveryEmail,
      otp: otpValue,
    });

    // Check if OTP is valid (4 digits)
    if (otpValue.length !== 4) {
      alert("Please enter a complete 4-digit OTP");
      return;
    }

    try {
      // Send OTP for verification
      await dispatch(
        verifyOtp({ email: recoveryEmail, otp: otpValue })
      ).unwrap();
      console.log("OTP verified successfully, navigating to change password");
      navigate("/change-password");
    } catch (err) {
      toast.error("Verification failed:", err.message);
      // Show toast error message on OTP verification failure
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    console.log("Resending OTP to:", recoveryEmail);
    try {
      // Send request to resend OTP
      await dispatch(forgotPassword(recoveryEmail));
      console.log("OTP resent successfully");
    } catch (err) {
      console.error("Failed to resend OTP:", err.message);
      toast.error("Failed to resend OTP. Please try again.");
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

      <img src="/otp.svg" alt="logo" className="otp5" />

      <a href="#" onClick={() => navigate("/forgot-password")}>
        <img src="back.svg" className="back hidden md:block" alt="back" />
      </a>
      <div id="container1">
        <h1 id="codemail">Enter the code</h1>
        <p id="mess1">
          Enter the 4-digit OTP code we have sent to {recoveryEmail}.
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
        
        <button
          className="verify1"
          onClick={handleVerify}
          disabled={isLoading}
          style={{ opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
        <br />
        <div className="didnt1">
          <span>Didn't receive the code?</span>
          <span
            id="gradient1"
            onClick={handleResendOtp}
            style={{ cursor: "pointer" }}
          >
            Resend code.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Otp;
