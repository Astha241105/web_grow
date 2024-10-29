import React from "react";
import "./changepass.css";

const Changepass = () => {
  return (
    <div id="container">
      <h1 id="change">Change Password</h1>
      <div className="label">New Password:</div>
      <input
        className="cpass"
        placeholder="Enter password"
        type="password"
      ></input>
      <div className="label">Confirm Password:</div>
      <input
        className="cpass"
        placeholder="Confirm password"
        type="password"
      ></input>
      <button id="cont">Continue</button>
    </div>
  );
};

export default Changepass;
