import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../features/auth/authSlice';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (token) {
      navigate('/otpWithMail');
    }
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [token, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      console.log('Login result:', result); // Debug log
      if (result) {
        navigate('/otpWithMail');
      }
    } catch (err) {
      console.error('Login error:', err); // Debug log
    }
  };