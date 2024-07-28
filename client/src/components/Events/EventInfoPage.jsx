import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../auth.jsx';
import Main_sidebar from '../sidenav/main_sidebar';

const EventInfoPage = ({ isUpcoming }) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const { isLoggedIn, authToken } = useAuth();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://mlsa-backend-4w03.onrender.com/api/event/cs/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const eventData = response.data.data[0];
        setEvent({
          name: eventData.eventName,
          image: eventData.image,
          link: eventData.registrationLink,
          description: eventData.eventInfo,
          isRegistered: eventData.isRegistered,
        });
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId, isUpcoming, isLoggedIn, authToken]);

  const handleRegister = async (e) => {
    const isRegistered = e.target.checked;
    try {
      await axios.post(
        `https://mlsa-backend-4w03.onrender.com/api/registerEvent/c/${eventId}`,
        { isRegistered },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setEvent((prevEvent) => ({
        ...prevEvent,
        isRegistered,
      }));
    } catch (error) {
      console.error('Error updating event registration:', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-cyan-100">
      <Main_sidebar className="lg:mr-8" />
      <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl mt-6 font-bold text-sky-600 text-center mb-4 sm:mb-8">
          {event.name}
        </h1>
        <div className="flex justify-center mb-4 sm:mb-8">
          <img
            src={event.image}
            alt={event.name}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-lg shadow-lg object-cover object-center"
          />
        </div>
        <p className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-8 text-center">
          {event.description}
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-8 text-center">
          Registration Link:
        </h2>
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-bold underline mb-4 sm:mb-8 text-center break-words"
        >
          {event.link}
        </a>
        <div className="flex items-center mb-4 sm:mb-8">
          <input
            type="checkbox"
            id="attend"
            checked={event.isRegistered}
            onChange={handleRegister}
            className="mr-2"
          />
          <label htmlFor="attend" className="text-base sm:text-lg font-bold">
            I want to attend this event
          </label>
        </div>
        {event.isRegistered && (
          <p className="text-green-500 mb-4 sm:mb-8 text-center font-bold">
            You have registered successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default EventInfoPage;
