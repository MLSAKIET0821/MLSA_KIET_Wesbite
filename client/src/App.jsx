import { useState, lazy, Suspense } from 'react';
import './App.css';
import './loader.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { MainContextProvider } from './Context/MainContext';
import { AuthProvider } from './auth';

const Landing = lazy(() => import("./components/landing/landing"));
const TeamPage = lazy(() => import("./components/team/team"));
const Sidebar = lazy(() => import("./components/sidenav/sidebar.jsx"));
const Main_sidebar = lazy(() => import("./components/sidenav/main_sidebar.jsx"));
const AboutUs = lazy(() => import("./components/About/about.jsx"));
const EventPage = lazy(() => import("./components/Events/EventPage.jsx")); 
const EventInfoPage = lazy(() => import("./components/Events/EventInfoPage.jsx"));
const EventPastPage = lazy(() => import("./components/Events/EventPastPage.jsx"));
const SignUp = lazy(() => import('./pages/Login/SignUp.jsx'));
const OTPVerification = lazy(() => import('./pages/Login/OtpVerification.jsx'));
const ForgotPassword = lazy(() => import('./pages/Login/ForgetPassword.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound.jsx'));
import Mainfooter from './components/footer/mainfooter.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <MainContextProvider>
      <AuthProvider>
        <Router>
          <div className='bg-black scroll-smooth'>
            <Suspense fallback={
              <div className='flex justify-center items-center h-screen flex-col'>    
                <div className="loader text-white text-4xl mb-3"></div>
              </div>
            }>
              <Main_sidebar />
              <Routes>
                <Route path="/" element={<><Landing /><AboutUs /></>} />
                <Route path="/members" element={<TeamPage />} />
                <Route path='/events' element={<EventPage />} /> 
                <Route path="/event-info/:eventId" element={<><EventPastPage /><Mainfooter/></>} />
                <Route path="/upcoming-event-info/:eventId" element={<><EventInfoPage isUpcoming={true} /><Mainfooter/></>} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<SignUp />} />
                <Route path='/otp-verification' element={<OTPVerification />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </AuthProvider>
    </MainContextProvider>
  );
}

export default App;

