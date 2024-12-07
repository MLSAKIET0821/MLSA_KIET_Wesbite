import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  FormWrapper,
  Title,
  Input,
  Button
} from './SignUp';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const showSuccessAlert = (message) => {
    toast.success(message);
  };

  const showErrorAlert = (message) => {
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      showErrorAlert('Email and OTP are required!');
      return;
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      showErrorAlert('OTP must be a 6-digit number!');
      return;
    }

    try {
      const response = await axios.post('https://mlsa-backend-4w03.onrender.com/api/user/verifyEmail', { 
        email: email,
        code: otp
      });
      if (response.status === 200) {
        showSuccessAlert(response.data.message || 'OTP verified successfully!');
        navigate('/login');
      } else {
        showErrorAlert(response.data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      showErrorAlert(error.response?.data?.message || 'Error verifying OTP. Please try again.');
    }
  };

  return (
    <Container>
      <ToastContainer />
      <FormWrapper>
        <Title>OTP Verification</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
          />
          <Button type="submit">Verify OTP</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default OTPVerification;

