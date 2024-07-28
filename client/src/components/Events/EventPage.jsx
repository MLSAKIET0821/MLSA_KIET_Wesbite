import React, { useEffect, useState } from "react";
import Mainfooter from "../footer/mainfooter.jsx";
import Event from "./events.jsx";

const EventPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  return (
    <>
      <Event isLoggedIn={isLoggedIn} />
      <Mainfooter />
    </>
  );
};

export default EventPage;
