import React from "react";
import "./CreatePass.css";
const CreatePass = () => {
  return (
    <div className="forgot-pass">
      <img src="/Rectangle2.png" className="white-bg" alt="background" />
      <img
        src="/bgMobile.png"
        className="block md:hidden white-bgMobile"
        alt="background"
      />
      <div className="container">
        <div className="image-section">
          <img src="/cah.svg" alt="logo" className="logo" />
          <img src="back.svg" className="cn-home" />
        </div>
        <div className="form-section2">
          <h3 className="cnhead">Create your account</h3>
          <form>
            <div className="cnform2">
              <label For="Password" className="block mb-1">
                Password:
              </label>
              <input
                id="Password"
                placeholder="Enter Password"
                className="pswd"
              ></input>
              <img src="/eye.svg" alt="eye" className="arrow1" />
              <label For="ConfirmPassword" className="block mb-1">
                Conform Password:
              </label>
              <input
                id="ConfirmPassword"
                placeholder="Confirm Password"
                className="pswd"
              ></input>
              <img src="/eye.svg" alt="eye" className="arrow2" />
            </div>
            <img src="square.svg" className="square" />
            <p className="pass-para">
              All your information is collected, stored and processed as per our
              data processing guidelines. By signing up you agree to our{" "}
              <span>Privacy Policy</span> and <span>Term & Conditions</span>.
            </p>
            <button type="submit" className="pass-button">
              Get OTP
            </button>

            <p className="signin-link">
              Already have an account?{" "}
              <a href="/" className="sign-in">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreatePass;
