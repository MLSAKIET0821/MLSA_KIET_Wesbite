import React, { useState, useCallback } from 'react';
import { useAuth } from '../../auth.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { login } = useAuth();
  const [signIn, toggle] = useState(true);
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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  }, []);

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
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className={`relative w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 ${signIn ? 'translate-x-0' : 'translate-x-full'}`}>
        {message.text && (
          <div className={`p-4 text-white ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
            {message.text}
          </div>
        )}

        <div className={`absolute inset-0 flex transition-opacity duration-500 ${signIn ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-1/2 bg-blue-500 flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-4">To keep connected with us please login with your personal info</p>
              <button onClick={() => toggle(true)} className="bg-transparent border-2 border-white text-white py-2 px-4 rounded">Sign In</button>
            </div>
          </div>

          <div className="w-1/2 bg-green-500 flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
              <p className="mb-4">Enter your personal details and start your journey with us</p>
              <button onClick={() => toggle(false)} className="bg-transparent border-2 border-white text-white py-2 px-4 rounded">Sign Up</button>
            </div>
          </div>
        </div>

        <div className={`transition-transform duration-500 ${signIn ? 'translate-x-0' : 'translate-x-full'}`}>
          <form onSubmit={handleSignUp} className="p-8">
            <h2 className="text-2xl font-bold mb-6">Create Account</h2>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
            <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
            <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
            <input type="file" name="profileImage" onChange={handleImageChange} className="w-full mb-4" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Sign Up</button>
          </form>

          <form onSubmit={handleSignIn} className="p-8">
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required />
            <a href="#" className="text-blue-500 mb-4 inline-block">Forgot your password?</a>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
