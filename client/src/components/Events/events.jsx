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
  const [events, setEvents] = useState({ upcoming: [], past: [] });
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcomingResponse, pastResponse] = await Promise.all([
          axios.get("https://mlsa-backend-4w03.onrender.com/api/event/allEventsupcoming"),
          axios.get("https://mlsa-backend-4w03.onrender.com/api/event/allEventspast")
        ]);

        const upcomingEvents = upcomingResponse.data.data || [];
        const pastEvents = pastResponse.data.data || [];

        setNewEvents(upcomingEvents);
        setEvents({ upcoming: upcomingEvents, past: pastEvents });

        setShowPlaceholder(upcomingEvents.length === 0);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents({ upcoming: [], past: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [setNewEvents]);

  const toggleZoom = () => setZoomed(!zoomed);

  return (
    <div className="container mx-auto py-5 bg-black">
      {isLoggedIn ? (
        <Eventnew />
      ) : (
        <>
          <Section title="Upcoming Events">
            {loading ? (
              <Loading />
            ) : showPlaceholder ? (
              <ImageContainer>
                <PlaceholderImage
                  src="/roadmap.jpeg"
                  alt="No Upcoming Events"
                  onClick={toggleZoom}
                  style={{ transform: zoomed ? 'scale(1.5)' : 'scale(1)' }}
                />
              </ImageContainer>
            ) : (
              events.upcoming.map((event) => (
                <UpComingEventCards
                  key={event._id}
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
          </Section>
          <Section title="Past Events">
            {loading ? (
              <Loading />
            ) : Array.isArray(events.past) && events.past.length > 0 ? (
              events.past.map((event) => (
                <EventCards
                  key={event._id}
                  id={event._id}
                  eventName={event.eventName}
                  date={event.date}
                  eventInfo={event.eventInfo}
                  image={event.image}
                />
              ))
            ) : (
              <div className="h-full w-screen flex justify-center items-center">
                <h1 className="text-white font-extrabold text-5xl">Server Error</h1>
              </div>
            )}
          </Section>
        </>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <>
    <div className="text-center mt-2 sm:mt-2 md:mt-2 lg:mt-8 xl:mt-8">
      <h1 className="h-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-0 m-auto bg-gradient-to-l from-sky-500 from-1% to-blue-400 to-70% bg-clip-text text-transparent">
        {title}
      </h1>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto px-4 lg:ml-28 sm:ml-16 sm:mr-8">
      {children}
    </div>
  </>
);

export default Event;
