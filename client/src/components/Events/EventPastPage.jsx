import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPeopleGroup, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";
import Main_sidebar from '../sidenav/main_sidebar';
import { useParams } from 'react-router-dom';

const EventPastPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://mlsa-backend-4w03.onrender.com/api/event/c/${eventId}`);
        const eventData = response.data.data[0];
        setEvent({
          name: eventData.eventName,
          image: eventData.image,
          description: eventData.eventInfo,
          attendeeCount: eventData.registeredUser,
          images: eventData.images || [],
        });
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? event.images.length - 1 : prevIndex - 1));
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === event.images.length - 1 ? 0 : prevIndex + 1));
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  };

  const getVisibleImages = () => {
    const visibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const visibleImages = [];

    for (let i = currentIndex; i < currentIndex + visibleCount; i++) {
      const index = i >= event.images.length ? i % event.images.length : i;
      visibleImages.push(event.images[index]);
    }

    return visibleImages;
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Main_sidebar className="mr-8" />
      <div className="flex-1 p-4 md:ml-15">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-600 text-center mt-6 mb-6">
          {event.name}
        </h1>
        <div className="flex flex-col md:flex-row items-start justify-center mt-6 w-full">
          <img
            src={event.image}
            alt={event.name}
            className="w-full max-w-md mb-6 md:mb-0 md:mr-10 rounded-lg"
            style={{ height: 'auto' }}
          />
          <div className="md:w-2/4 w-full">
            <div className="text-white text-lg sm:text-xl md:text-2xl ml-0 md:ml-5 mb-8">
              {ReactHtmlParser(event.description)}
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <FontAwesomeIcon icon={faPeopleGroup} className="mr-2 text-blue-500 text-2xl sm:text-3xl md:text-4xl" />
              <span className="text-blue-500 text-xl sm:text-2xl md:text-3xl font-bold">
                {event.attendeeCount} Students Registered
              </span>
            </div>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-left font-bold mb-8 text-sky-600 mt-8 ml-4 md:ml-24">
          Event Images
        </h2>
        <div className="relative w-full">
          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
              onClick={handlePrevClick}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
              onClick={handleNextClick}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="overflow-hidden lg:ml-32 lg:mr-10 flex justify-center mb-16">
            <div ref={sliderRef} className="flex flex-no-wrap w-full">
              {getVisibleImages().map((imageUrl, index) => (
                <div key={index} className="flex-shrink-0 mr-4 last:mr-0  max-w-xs w-96 h-96 sm:w-80 sm:h-80 md:w-96 md:h-96  sm:max-w-sm md:max-w-md mb-8">
                  <img
                    src={imageUrl}
                    alt={`Event ${currentIndex + index}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x600?text=Image+Not+Found';
                    }}
                    className="w-full h-auto max-h-96 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPastPage;
