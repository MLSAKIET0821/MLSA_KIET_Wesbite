import React, { useState } from 'react';
import { useAuth } from '../../auth.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #000; /* Background color set to black */
`;

const FormWrapper = styled.div`
  background: transparent; /* Make background fully transparent */
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 400px;
  max-width: 100%;
  padding: 20px;
  margin: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3); /* Border to enhance visibility */
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-weight: bold;
  color: #fff; /* White text color */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.7); /* Slightly transparent input background */
  color: #000; /* Black text color for input */

  /* Add this line to change the placeholder color */
  &::placeholder {
    color: #000; /* Change the color to black */
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  background: #00bcd4; /* Background color set to cyan 600 */
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0097a7; /* Slightly darker cyan for hover effect */
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #00bcd4; /* Cyan text color for toggle button */
  cursor: pointer;
  margin-top: 10px;
`;

const SignUp = () => {
  const { login } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate(); // Access navigate function here

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    branch: '',
    year: '',
    profileImage: null,
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const showSuccessAlert = (message) => {
    toast.success(message); 
    navigate('/login'); 
  };

  const showErrorAlert = (message) => {
    toast.error(message); // Show the error message using toast
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.fullName || !formData.branch || !formData.year || !formData.username || !formData.email || !formData.password || !formData.profileImage) {
      showErrorAlert('All fields are required!');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
  
    try {
      const response = await axios.post('https://mlsa-backend-4w03.onrender.com/api/user/register', data);
      console.log('User created:', response.data);
      if (response.status==200) {
        showSuccessAlert('User created successfully! Please log in with your credentials.'); // Pass the desired message
      } else {
        console.error('Signup failed:', response.data.message);
        showErrorAlert(`Signup failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      showErrorAlert(`Error creating user: ${error.message}`);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await axios.post('https://mlsa-backend-4w03.onrender.com/api/user/login', { email, password });
      console.log('User logged in:', response.data);
      login(response.data);
      if (response.status==200) {
        localStorage.setItem('token', response.data.data.accessToken);
        showSuccessAlert('Login successful!');
        window.location.reload();
        navigate('/events'); 
       
      } else {
        console.error('Login failed:', response.data.message);
        showErrorAlert(`Login failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      showErrorAlert(`Error logging in: ${error.message}`);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <FormWrapper>
        <Title>{isSignIn ? 'Sign In' : 'Sign Up'}</Title>
        <form onSubmit={isSignIn ? handleSignIn : handleSignUp}>
          {!isSignIn && (
            <>
              <Input type='text' placeholder='Full Name' name='fullName' value={formData.fullName} onChange={handleChange} required />
              <Input type='text' placeholder='Branch' name='branch' value={formData.branch} onChange={handleChange} required />
              <Input type='text' placeholder='Year' name='year' value={formData.year} onChange={handleChange} required />
              <Input type='text' placeholder='Username' name='username' value={formData.username} onChange={handleChange} required />
              <Input type='file' accept='image/*' name='profileImage' onChange={handleImageChange} required />
            </>
          )}
          <Input type='email' placeholder='Email' name='email' value={formData.email} onChange={handleChange} required />
          <Input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
          <Button type='submit'>{isSignIn ? 'Sign In' : 'Sign Up'}</Button>
        </form>
        <ToggleButton onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'Create an account' : 'Already have an account? Sign In'}
        </ToggleButton>
      </FormWrapper>
    </Container>
  );
};

export default SignUp;
