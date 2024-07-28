import { useState, lazy, Suspense, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { MainContextProvider } from './Context/MainContext';
const Landing = lazy(() => import("./components/landing/landing"));
import { AuthProvider } from './auth';
const TeamPage = lazy(() => import("./components/team/team"));
const Sidebar = lazy(() => import("./components/sidenav/sidebar.jsx"));
const Main_sidebar = lazy(() => import("./components/sidenav/main_sidebar.jsx"));
const AboutUs = lazy(() => import("./components/About/about.jsx"));
const EventOrRegister = lazy(() => import("./Context/EventOrRegister"));
const EventPage = lazy(() => import("./components/Events/EventPage.jsx")); 
const EventInfoPage = lazy(() => import("./components/Events/EventInfoPage.jsx"));
const EventPastPage = lazy(() => import("./components/Events/EventPastPage.jsx"));
const SignUp = lazy(() => import('./pages/Login/SignUp.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound.jsx'));
// const Main_timeline = lazy(() => import("./components/timeline/main_timeline"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <MainContextProvider>
      <AuthProvider>
        <Router >
          <div className='bg-black scroll-smooth'>
            <Suspense fallback={<h1 className='text-white text-5xl justify-center text-center'>Loading...</h1>}>
              <Main_sidebar />
              <Routes>
                <Route path="/" element={<><Landing /> <AboutUs /></>} />
                {/* <Route path="/home" element={<AboutUs/>}/> */}
                <Route path="/members" element={<TeamPage />} />
                <Route path='/events' element={<EventPage />} /> 
                <Route path="/event-info/:eventId" element={<EventPastPage />} />
                <Route path="/upcoming-event-info/:eventId" element={<EventInfoPage isUpcoming={true} />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<SignUp />} />
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