import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPersonalDetails } from "../store/slices/accountslice";
import { useNavigate } from "react-router-dom";
import "./CreateAccountP.css";

const CreateAccountP = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const [firstName, ...lastNameParts] = name.trim().split(" ");
    const lastName = lastNameParts.join(" ");

    dispatch(setPersonalDetails({ firstName, lastName, email, phone }));

    navigate("/create-pass-participant");
  };

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
          <img src="/createnew.svg" alt="logo" className="logo" />
          <img src="home.svg" className="cn-home hidden md:block" />
        </div>
        <div className="form-sec">
          <h3 className="cnhead">Create your account</h3>
          <form onSubmit={handleSubmit}>
            <div className="cnform">
              <label htmlFor="name" className="block mb-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="phone" className="block mb-1">
                Phone number:
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
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
