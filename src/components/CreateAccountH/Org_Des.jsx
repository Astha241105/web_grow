import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHostDetails } from "../store/slices/hostslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";  // Import Toastify
import "react-toastify/dist/ReactToastify.css";  // Import CSS for Toastify
import "./Org_Des.css";

const Org_Des = () => {
  const [formData, setFormData] = useState({
    organization: "",
    designation: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingHostDetails = useSelector((state) => state.host);

  // Regex for Organization and Designation (allows only alphabets and spaces)
  const orgDesRegex = /^[A-Za-z\s]+$/;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateInputs = () => {
    // Validate Organization
    if (!formData.organization.trim()) {
      toast.error("Organization is required.");
      return false;
    }
    if (!orgDesRegex.test(formData.organization)) {
      toast.error("Organization must contain only alphabets and spaces.");
      return false;
    }

    // Validate Designation
    if (!formData.designation.trim()) {
      toast.error("Designation is required.");
      return false;
    }
    if (!orgDesRegex.test(formData.designation)) {
      toast.error("Designation must contain only alphabets and spaces.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Exit if validation fails

    const updatedHostDetails = {
      ...existingHostDetails,
      ...formData,
    };

    dispatch(updateHostDetails(updatedHostDetails));

    toast.success("Validation successful. Proceeding...");
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
                Organization:
              </label>
              <input
                type="text"
                id="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Enter Organization"
                required
                className="opt"
              />

              <label htmlFor="designation" className="block mb-1">
                Designation:
              </label>
              <input
                type="text"
                id="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Enter Designation"
                required
                className="opt"
              />
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
