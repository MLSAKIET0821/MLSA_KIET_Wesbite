import React, { useState } from 'react';
import { useAuth } from '../../auth.jsx';
import axios from 'axios';
import * as Components from './Component.js';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { login } = useAuth();
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    branch: '',
    year: '',
    profileImage: null,
    password: '',
    email: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await axios.post('https://mlsa-backend-4w03.onrender.com/api/user/register', data);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        login(response.data);
        setMessage({ text: 'Signup successful!', type: 'success' });
        navigate('/events');
      } else {
        setMessage({ text: 'Signup failed: ' + response.data.message, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error creating user: ' + error.message, type: 'error' });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await axios.post('https://mlsa-backend-4w03.onrender.com/api/user/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.accessToken);
        login(response.data);
        setMessage({ text: 'Login successful!', type: 'success' });
        navigate('/events');
      } else {
        setMessage({ text: 'Login failed: ' + response.data.message, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error logging in: ' + error.message, type: 'error' });
    }
  };

  return (
    <Components.Container>
      {message.text && (
        <div style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.text}
        </div>
      )}
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignUp}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <Components.Input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <Components.Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <Components.Input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} required />
          <Components.Input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
          <Components.Input type="file" name="profileImage" onChange={handleImageChange} required />
          <Components.Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignIn}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <Components.Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start your journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default SignUp;
