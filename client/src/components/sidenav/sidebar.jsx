import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/sidebar.css';
import { AiOutlineHome } from 'react-icons/ai';
import { SlCalender } from 'react-icons/sl';
import { RiTeamLine } from 'react-icons/ri';
import { IoLogIn } from 'react-icons/io5';
import { RiLogoutBoxLine } from "react-icons/ri";

function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'your_token_value');
  };

  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > prevScrollPos) {
      setVisible(false);
    } else if (currentScroll + 100 < prevScrollPos) {
      setVisible(true);
    }
    setPrevScrollPos(currentScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`flex flex-col ml-1 items-center justify-evenly xl:flex xl:bg-D3D3D3 xl:justify-evenly xl:items-center xl:flex-col icons ${
        visible ? 'toggle' : ''
      }`}
    >
      <div onClick={handleClick} className="Home">
        <Link to="/">
          <AiOutlineHome size={27} />
        </Link>
      </div>
      <div onClick={handleClick} className="Event">
        <Link to="/events">
          <SlCalender size={27} />
        </Link>
      </div>
      <div onClick={handleClick} className="Members">
        <Link to="/members">
          <RiTeamLine size={27} />
        </Link>
      </div>
      {isLoggedIn ? (
        <div onClick={handleLogout} className="Logout">
          <RiLogoutBoxLine size={27} />
        </div>
      ) : (
        <div onClick={handleLogin} className="SignUp">
          <IoLogIn size={27} />
        </div>
      )}
    </div>
  );
}

export default Sidebar;