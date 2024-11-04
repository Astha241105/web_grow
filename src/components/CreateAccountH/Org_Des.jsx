import React from "react";
import "./Org_Des.css";
const Org_Des = () => {
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
              <label For="organisation" className="block mb-1">
                Organisation:
              </label>
              <select id="organisation">
                <option value="Enter Organisation">Enter Organisation</option>
              </select>
              <img src="/down-arrow.svg" alt="arrow" className="arrow1" />
              <label For="designation" className="block mb-1">
                Designation:
              </label>
              <select id="designation">
                <option value="Enter Designation">Enter Designation</option>
              </select>
              <img src="/down-arrow.svg" alt="arrow" className="arrow2" />
            </div>
            <button type="submit" className="org-continue">
              Continue
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
export default Org_Des;
