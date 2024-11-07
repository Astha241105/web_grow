import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateHostDetails } from "../store/slices/hostslice";
import { useNavigate } from "react-router-dom";

const CreateAccountH = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const [firstName, ...lastNameParts] = formData.name.split(" ");
    const lastName = lastNameParts.join(" ");

    dispatch(
      updateHostDetails({
        firstName,
        lastName,
        email: formData.email,
        mobile: formData.mobile,
      })
    );

    navigate("/create-account-host-options");
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
          <img src="/create_account.svg" alt="logo" className="logo" />
          <a href="#" onClick={() => navigate("/")}>
            <img src="home.svg" className="cn-home hidden md:block" />
          </a>
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
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="mobile" className="block mb-1">
                Mobile Number:
              </label>
              <input
                type="tel"
                id="mobile"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
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

export default CreateAccountH;
