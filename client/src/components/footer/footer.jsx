import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillLinkedin,
  AiFillInstagram,
  AiFillMail,
} from "react-icons/ai";
import Image from "./L1.jpg";

const HandleClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  const socialIcons = [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/company/mlsa-kiet",
      icon: <AiFillLinkedin size={24} />,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/mlsa_kiet",
      icon: <AiFillInstagram size={24} />,
    },
    {
      name: "Mail",
      link: "mailto:Mlsa@kiet.edu",
      icon: <AiFillMail size={24} />,
    },
  ];

  return (
    <footer className="bg-black-700 py-4 text-white">
      <hr className="border-t border-gray-1000 my-4" />
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:col-span-2 md:col-span-1 text-center sm:text-left">
           
              <img
              src={Image}
              alt="logo"
              className="h-15 lg:h-30 sm:h-20 w-32 sm:w-40 rounded mx-auto sm:mx-0 mb-2 sm:mr-4"
            />
            
            
            <div>
              <p className="text-2xl font-semibold">KIET Group of Institutions</p>
              <p className="text-base">
                Delhi-NCR, Meerut Road, Ghaziabad, Uttar Pradesh 201206
              </p>
            </div>
          </div>

          <div className="text-center mx-auto">
            <div className="mb-2" onClick={HandleClick}>
              <h1 className="text-lg font-semibold mb-1">About Us</h1>
              <Link
                to="/"
                className={`text-md cursor-pointer block ${
                  location.pathname === "/"
                    ? "text-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                Home
              </Link>
            </div>
            <div onClick={HandleClick} className="mb-2">
              <Link
                to="/events"
                className={`text-md cursor-pointer block ${
                  location.pathname === "/events"
                    ? "text-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                Events
              </Link>
            </div>
            <div onClick={HandleClick} className="mb-2">
              <Link
                to="/members"
                className={`text-md cursor-pointer block ${
                  location.pathname === "/members"
                    ? "text-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                Members
              </Link>
            </div>
          </div>

          <div className="text-left mx-auto">
            <div className="mb-2">
              <h1 className="text-lg font-semibold mb-1">Contact Us</h1>
            </div>
            <div className="flex flex-col items-left space-y-2">
              {socialIcons.map((socialIcon) => (
                <a
                  className="flex items-center hover:text-blue-500 transition-colors duration-300"
                  href={socialIcon.link}
                  key={socialIcon.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialIcon.icon}
                  <span className="ml-1 text-md">{socialIcon.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2 md:px-10 pt-2 text-center">
        <p className="text-sm">
          @{new Date().getFullYear()} MLSA@Kiet. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;