import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateOtp, resendOtp } from "../store/slices/otpslice";
import { toast } from "react-toastify"; // Import Toastify
import "./OtpWithMail.css";

const OtpWithMail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstName, lastName, email, mobile, password } = useSelector(
    (state) => state.account
  );
  const { status, error } = useSelector((state) => state.otp);

  // Function to check if OTP format is correct (4 digits)
  const isOtpValid = () => {
    const otpValue = otp.join("");
    return /^\d{4}$/.test(otpValue); // Check if OTP is a 4-digit number
  };

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
    if (!isOtpValid()) {
      toast.error("Please enter a valid 4-digit OTP."); // Show error if OTP is invalid
      return;
    }

    const otpValue = otp.join("");
    dispatch(validateOtp({ email, otp: otpValue }));
  };

  const handleResendOtp = () => {
    dispatch(
      resendOtp({
        firstname: firstName,
        lastname: lastName,
        email: email,
        mobile: mobile,
        password: password,
        organization: null,
        designation: null,
        role: "user",
      })
    );
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/");
    }
  }, [status, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast if there's an error
    }
  }, [error]);

  return (
    <div className="forgot-pass">
      <img
        src="/Rectangle2.png"
        className="white-bg hidden md:block"
        alt="background"
      />
      <img src="/home.svg" alt="cross" className="cross hidden md:block" />
      <img
        src="/bgMobile.png"
        className="block md:hidden white-bgMobile"
        alt="background"
      />
      <img src="/otp.svg" alt="logo" className="otp5" />
      <div id="container1">
        <div id="codemail">Enter the code</div>
        <p id="mess1">Enter the 4-digit OTP code we have sent to {email}.</p>

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
        <button
          className="verify1"
          onClick={handleVerify}
          disabled={status === "loading"}
          style={{ opacity: status === "loading" ? 0.7 : 1 }}
        >
          Verify
        </button>
        {status === "loading" && <p>Validating...</p>}
        {status === "failed" && (
          <p style={{ color: "red", fontSize: "20px" }}>
            <b>Incorrect code!</b>
            <br />
            Try again.
          </p>
        )}
        {status === "success" && (
          <p style={{ color: "green" }}>OTP Verified!</p>
        )}

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

export default OtpWithMail;
