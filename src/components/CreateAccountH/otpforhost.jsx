import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateHostOtp } from "../store/slices/hostotp";
import { resendHostOtp } from "../store/slices/hostslice";
import "./otpforhost.css";

const HostOtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.host.email);
  const firstName = useSelector((state) => state.host.firstName);
  const lastName = useSelector((state) => state.host.lastName);
  const mobile = useSelector((state) => state.host.mobile);
  const organization = useSelector((state) => state.host.organization);
  const designation = useSelector((state) => state.host.designation);
  const password = useSelector((state) => state.host.password);
  const role = useSelector((state) => state.host.role);

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
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    dispatch(validateHostOtp({ email, otp: otpValue }));
  };

  const handleResendOtp = () => {
    const hostDetails = {
      firstName,
      lastName,
      email,
      mobile,
      organization,
      designation,
      password,
      role,
    };
    console.log(hostDetails);
    dispatch(resendHostOtp(hostDetails));
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/home");
    }
  }, [status, navigate]);

  return (
    <div id="contout10">
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
        <button
          className="verify1"
          onClick={handleVerify}
          disabled={status === "loading"}
        >
          Verify
        </button>
        {status === "loading" && <p>Validating...</p>}
        {status === "failed" && (
          <p style={{ color: "red" }}>OTP invalid! Please try again.</p>
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

export default HostOtpVerification;
