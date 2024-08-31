import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EventCards, UpComingEventCards } from '../joywin-cards/Card';
import { useAuth } from '../../auth';
import styled from 'styled-components';
import Loading from '../Loading/Loading';
import { useNavigate } from "react-router-dom";

// Styled-components
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
  width: 100%;
  height: 100%;
`;

const Eventnew = () => {
  const [events, setEvents] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { 'Authorization': `Bearer ${token}` } };

        const [upcomingResponse, pastResponse] = await Promise.all([
          axios.get('https://mlsa-backend-4w03.onrender.com/api/event/allEventssupcoming', config),
          axios.get('https://mlsa-backend-4w03.onrender.com/api/event/allEventspast', config)
        ]);

        const upcomingEventsList = Array.isArray(upcomingResponse.data.data) ? upcomingResponse.data.data : [];
        const pastEventsList = pastResponse.data.data || [];
        const now = new Date();

        setEvents({
          upcoming: upcomingEventsList.filter(event => new Date(event.date) >= now),
          past: pastEventsList,
        });
      } catch (error) {
        setError('Error fetching events.');
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const toggleZoom = () => setZoomed(!zoomed);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8 bg-black">
      <Section title="Upcoming Events">
        <EventsGrid events={events.upcoming} isLoggedIn={isLoggedIn} navigate={navigate} zoomed={zoomed} toggleZoom={toggleZoom} />
      </Section>

      <Section title="Past Events">
        <EventsGrid events={events.past} navigate={navigate} />
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="text-center mt-2">
    <h1 className="h-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-0 m-auto bg-gradient-to-l from-sky-500 from-1% to-blue-400 to-70% bg-clip-text text-transparent">
      {title}
    </h1>
    {children}
  </div>
);

const EventsGrid = ({ events, isLoggedIn, navigate, zoomed, toggleZoom }) => (
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mx-auto lg:ml-28 sm:ml-16 sm:mr-8">
    {events.length > 0 ? (
      events.map(event => (
        <EventCardWrapper key={event._id} event={event} isLoggedIn={isLoggedIn} navigate={navigate} />
      ))
    ) : (
      <ImageContainer>
        <PlaceholderImage
          src="/roadmap.jpeg"
          alt="No Events"
          onClick={toggleZoom}
          style={{ transform: zoomed ? 'scale(1.5)' : 'scale(1)' }}
        />
      </ImageContainer>
    )}
  </div>
);

const EventCardWrapper = ({ event, isLoggedIn, navigate }) => (
  <div className="mr-4 sm:justify-center md:justify-start lg:justify-start xl:justify-start">
    {isLoggedIn ? (
      <UpComingEventCards
        _id={event._id}
        eventName={event.eventName}
        image={event.image}
        date={event.date}
        eventInfo={event.eventInfo}
        isRegistered={event.isRegisteres}
        navigate={navigate}
      />
    ) : (
      <EventCards
        eventName={event.eventName}
        image={event.image}
        date={event.date}
        eventInfo={event.eventInfo}
        id={event._id}
        navigate={navigate}
      />
    )}
  </div>
);

export default Eventnew;
