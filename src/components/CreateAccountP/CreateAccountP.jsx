import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPersonalDetails } from "../store/slices/accountslice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "./CreateAccountP.css";

const CreateAccountP = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Regex for name, email, and mobile validation
  const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Default email regex
  const mobileRegex = /^[0-9]{10}$/; // Only 10 digits

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Name Validation
    if (!nameRegex.test(name.trim())) {
      toast.error("Name should only contain alphabets and spaces.");
      setLoading(false);
      return;
    }

    // Email Validation
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Mobile Validation
    if (!mobileRegex.test(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }

    // If all validations pass
    const [firstName, ...lastNameParts] = name.trim().split(" ");
    const lastName = lastNameParts.join(" ");

    dispatch(setPersonalDetails({ firstName, lastName, email, mobile }));
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

              <label htmlFor="mobile" className="block mb-1">
                Mobile number:
              </label>
              <input
                type="tel"
                id="mobile"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setmobile(e.target.value)}
                required
                maxLength="10"
                minLength="10"
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits"
              />
            </div>
            <button type="submit" className="cn-continue" disabled={loading}>
              {loading ? "Processing..." : "Continue"}
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
