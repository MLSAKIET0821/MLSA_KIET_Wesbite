import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../Context/MainContext.jsx";
import { EventCards, UpComingEventCards } from "../joywin-cards/Card.jsx";
import Loading from "../Loading/Loading.jsx";
import styled from 'styled-components';
import Eventnew from './Eventnew';

const PlaceholderImage = styled.img`
  max-width: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; 
  width: 100%;
`;

const Event = ({ isLoggedIn }) => {
  const { newEvents, setNewEvents } = useContext(MainContext);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const navigate = useNavigate();

  const getUpComingEventData = async () => {
    try {
      const res = await axios.get("https://mlsa-backend-4w03.onrender.com/api/event/allEventsupcoming");
      setNewEvents(res.data.data);
      if (res.data.data.length === 0) {
        setShowPlaceholder(true);
      }
      console.log(res.data.data);
    } catch (err) {
      console.log(err, " it has an error");
    } finally {
      setLoading(false);
    }
  };

  const getEventData = async () => {
    try {
      const events = await axios.get("https://mlsa-backend-4w03.onrender.com/api/event/allEventspast");
      setEvents(events.data);
      console.log(events.data);
    } catch (err) {
      setEvents([]);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUpComingEventData();
    getEventData();
  }, []);

  const handleRegister = () => {
    navigate("/login");
  };

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };

  return (
    <>
      <div className="container mx-auto py-5 bg-black">
        {isLoggedIn ? (
          <Eventnew />
        ) : (
          <>
            <div className="text-center mt-2 sm:mt-2 md:mt-2 lg:mt-8 xl:mt-8">
              <h1 className="h-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-0 m-auto bg-gradient-to-l from-sky-500 from-1% to-blue-400 to-70% bg-clip-text text-transparent">
                Upcoming Events
              </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto px-4 lg:ml-28 sm:ml-16sm:mr-8"> 
              {loading ? (
                <Loading />
              ) : showPlaceholder ? (
                <div className="flex justify-center items-center w-full h-full mt-7">
                  <ImageContainer>
                    <PlaceholderImage
                      src="/roadmap.jpeg"
                      alt="No Upcoming Events"
                      onClick={toggleZoom}
                      style={{ transform: zoomed ? 'scale(1.5)' : 'scale(1)' }}
                    />
                  </ImageContainer>
                </div>
              ) : (
                newEvents.map((event, index) => (
                  <UpComingEventCards
                    key={index}
                    id={event._id}
                    isRegistered={event.isRegisteres}
                    eventName={event.eventName}
                    date={event.date}
                    eventInfo={event.eventInfo}
                    image={event.image}
                    isLoggedIn={isLoggedIn}
                    navigate={navigate}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
      {!isLoggedIn && (
        <div className="container mx-auto py-8 bg-black">
          <div className="text-center mt-3 sm:mt-3 md:mt-3 lg:mt-8 xl:mt-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 m-auto bg-gradient-to-l from-sky-500 from-1% to-blue-400 to-70% bg-clip-text text-transparent">
              Events
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto px-4 lg:ml-28 sm:ml-10 sm:mr-8"> {/* Added ml-64 for large screens */}
            {loading ? (
  <Loading />
) : Array.isArray(events.data) && events.data.length > 0 ? (
  events.data.map((event) => (
    <div
                  className="mr-4 sm:justify-center md:justify-start lg:justify-start xl:justify-start"
                  key={event._id}
                >
                  <EventCards
                    id={event._id}
                    eventName={event.eventName}
                    date={event.date}
                    eventInfo={event.eventInfo}
                    image={event.image}
                  />
                </div>
              ))
            ) : (
              <div className="h-full w-screen flex justify-center items-center">
                <h1 className="text-white font-extrabold text-5xl">Server Error</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Event;