import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  FormWrapper,
  Title,
  Input,
  Button
} from './SignUp';

// Reuse the styled components from SignUp.jsx

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);

  const showSuccessAlert = (message) => {
    toast.success(message);
  };

  const showErrorAlert = (message) => {
    toast.error(message);
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mlsa-backend-4w03.onrender.com/api/user/forgot-password', { email });
      if (response.status === 200) {
        showSuccessAlert('OTP sent to your email');
        setStep(2);
      } else {
        showErrorAlert(`Failed to send OTP: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error requesting OTP:', error);
      showErrorAlert(`Error requesting OTP: ${error.message}`);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showErrorAlert('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      showErrorAlert('Password must be at least 8 characters long');
      return;
    }
    try {
      const response = await axios.post('https://mlsa-backend-4w03.onrender.com/api/user/new-password', {
        email,
        code: otp,
        newPassword
      });
      if (response.status === 200) {
        showSuccessAlert('Password reset successfully');
        navigate('/login');
      } else {
        showErrorAlert(`Failed to reset password: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      showErrorAlert(`Error resetting password: ${error.message}`);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <FormWrapper>
        <Title>Forgot Password</Title>
        {step === 1 ? (
          <form onSubmit={handleRequestOTP}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Request OTP</Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <Input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit">Reset Password</Button>
          </form>
        )}
      </FormWrapper>
    </Container>
  );
};

export default ForgotPassword;

