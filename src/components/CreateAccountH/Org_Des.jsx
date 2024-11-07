import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHostDetails } from "../store/slices/hostslice";
import { useNavigate } from "react-router-dom";
import "./Org_Des.css";

const Org_Des = () => {
  const [formData, setFormData] = useState({
    organization: "",
    designation: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingHostDetails = useSelector((state) => state.host);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHostDetails = {
      ...existingHostDetails,
      ...formData,
    };

    dispatch(updateHostDetails(updatedHostDetails));

    navigate("/create-pass-host");
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
          <img src="create_account.svg" alt="logo" className="logo" />
          <a href="#" onClick={() => navigate("/create-pass-host")}>
            <img src="back.svg" className="cn-home hidden md:block" />
          </a>
        </div>
        <div className="form-section2">
          <h3 className="cnhead">Create your account</h3>
          <form onSubmit={handleSubmit}>
            <div className="cnform2">
              <label htmlFor="organization" className="block mb-1">
                Organisation:
              </label>
              <select
                id="organization"
                value={formData.organization}
                onChange={handleInputChange}
                required
                className="opt"
              >
                <option value="">Enter Organisation</option>
                <option value="Organization A">Organization A</option>
                <option value="Organization B">Organization B</option>
              </select>
              <img src="/down-arrow.svg" alt="arrow" className="arrow1" />

              <label htmlFor="designation" className="block mb-1">
                Designation:
              </label>
              <select
                id="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="opt"
              >
                <option value="">Enter Designation</option>
                <option value="Manager">Manager</option>
                <option value="Head">Head</option>
              </select>
              <img src="/down-arrow.svg" alt="arrow" className="arrow2" />
            </div>

            <button type="submit" id="org-continue" className="opt">
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
