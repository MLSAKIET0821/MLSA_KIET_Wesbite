import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faL } from '@fortawesome/free-solid-svg-icons';
import { useState,useContext } from 'react';
import { MainContext } from '../../Context/MainContext';
import { useNavigate } from 'react-router-dom';

import './Card.css';



const EventCards = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCardHover = () => {
    setIsExpanded(true);
  };

  const handleCardLeave = () => {
    setIsExpanded(false);
  };

  const handleCardClick = () => {
    const isUpcoming = props.isUpcoming || false; 
    const path = isUpcoming ? `/upcoming-event-info/${props._id}` : `/event-info/${props.id}`;
    navigate(path);
  };

  return (
    <div
      className={`Card-content ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
      onClick={handleCardClick}
    >
      <div className="Card-title">
        <h3 className="font-bold text-lg">{props.eventName}</h3>
      </div>
      <div className="Card-image">
        <img src={props.image} alt="Event" />
      </div>
      <div className="Card-footer">
        <div className="date-container">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <h5 className="font-normal">{props.date.split('T')[0]}</h5>
        </div>
      </div>
      {isExpanded && (
        <div className="Card-info">
          <h3 className="font-bold text-3xl underline  text-white">{props.eventName}</h3>
          <h5 className="text-2xl">
            <FontAwesomeIcon icon={faCalendarAlt} />{' '}
            {props.date.split('T')[0]}
          </h5>
       
        </div>
      )}
    </div>
  );
};

const UpComingEventCards = (props) => {
  console.log('UpComingEventCards props:', props);
  const { showRegister, setShowRegister } = useContext(MainContext);
  const { eventName, setEventName } = useContext(MainContext);
  const { eventImage, setEventImage } = useContext(MainContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCardHover = () => {
    setIsExpanded(true);
  };

  const handleCardLeave = () => {
    setIsExpanded(false);
  };

  const handleRegister = () => {
    const token = localStorage.getItem('token');
    if (token) {
      if (props.isRegistered) {
        console.log(`Already registered for ${props.eventName}`);
        alert(`You have already registered for ${props.eventName}. Excited to see you on ${props.date}!`);
      } else {
        setEventName(props.eventName);
        setEventImage(props.image);
        setShowRegister(true);
        
        const path = `/upcoming-event-info/${props._id}`;
        props.navigate(path);
      }
    } else {
      props.navigate('/login');
    }
  };

  return (
    <div
      className={`Card-content ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
    >
      <div className="Card-title">
        <h3 className="font-bold text-lg">{props.eventName}</h3>
      </div>
      <div className="Card-image">
        <img src={props.image} alt="Event" />
      </div>
      <div className="Card-footer">
        <div className="date-container">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <h5 className="font-normal">{props.date.split('T')[0]}</h5>
        </div>
        <button
          onClick={handleRegister}
          className="font-bold"
          disabled={props.isRegistered}
        >
          {props.isRegistered ? 'Already Registered' : 'Register Now'}
        </button>
      </div>
      {isExpanded && (
        <div className="Card-info">
          <h3 className="font-bold text-2xl text-blue-900">{props.eventName}</h3>
          <h5>
            <FontAwesomeIcon icon={faCalendarAlt} />{' '}
            {props.date.split('T')[0]}
          </h5>
          <p>{props.eventInfo}</p>
          <button
            onClick={handleRegister}
            className="transition-all mt-10 font-bold text-lg absolute bottom-5 hover:scale-125"
            disabled={props.isRegistered}
          >
            {props.isRegistered ? 'Already Registered' : 'Register Now'}
          </button>
        </div>
      )}
    </div>
  );
};



export { EventCards, UpComingEventCards };


