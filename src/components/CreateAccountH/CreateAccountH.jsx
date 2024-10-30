import React from "react";

const CreateAccountP = () => {
  return (
    <div className="forgot-pass">
      <img src="/Rectangle2.png" className="white-bg" alt="background" />
      <div className="container">
        <div className="image-section">
          <img src="/createnew.svg" alt="logo" className="logo" />
          <img src="cah.svg" className="cn-home" />
        </div>
        <div className="form-section1">
          <h3 className="cnhead">Create your account</h3>
          <form>
            <div className="cnform">
              <label For="name" className="block mb-1">
                Name:
              </label>
              <input type="text" id="name" placeholder="Enter name" />

              <label For="email" className="block mb-1">
                Email:
              </label>
              <input type="email" id="email" placeholder="Enter email" />

              <label For="phone" className="block mb-1">
                Phone number:
              </label>
              <input type="tel" id="phone" placeholder="Enter phone number" />
            </div>
            <button type="submit" className="cn-continue">
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
export default CreateAccountP;
