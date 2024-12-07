import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
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

  const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const mobileRegex = /^[0-9]{10}$/; 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateInputs = () => {
    if (!formData.name.trim()) {
      console.log("Name is required error triggered.");
      toast.error("Name is required.");
      return false;
    
    }
    if (!nameRegex.test(formData.name)) {
      toast.error("Name must contain alphabets only, no spaces or special characters.");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (!formData.mobile.trim()) {
      toast.error("Mobile number is required.");
      console.log("Name is required error triggered."); // Debugging
      return false;
    }
    if (!mobileRegex.test(formData.mobile)) {
      toast.error("Mobile number must be a 10-digit number.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Exit if any validation fails

    const [firstname, ...lastNameParts] = formData.name.split(" ");
    const lastname = lastNameParts.join(" ") || ""; // Handle single-word names

    dispatch(
      updateHostDetails({
        firstname,
        lastname,
        email: formData.email,
        mobile: formData.mobile,
      })
    );

    toast.success("Validation successful. Proceeding...");
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
            <img src="home.svg" className="cn-home hidden md:block" alt="home" onClick={() => navigate('/')}/>
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
