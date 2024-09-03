import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillLinkedin, AiFillInstagram, AiFillMail } from "react-icons/ai";
import Image from "./L1.jpg";

const HandleClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer2 = () => {
  const location = useLocation();

  return (
    <footer className="bg-black-700 py-4 text-white">
      <hr className="border-t border-gray-1000 my-6" />
      <div className="container mx-auto px-6 md:px-10 mt-4 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center sm:col-span-2 md:col-span-1">
            <img
              src={Image}
              alt="logo"
              className="h-20 w-23  sm:h-15 sm:w-32 lg:h-32 lg:w-40 rounded mx-auto mb-2"
            />

            <p className="text-xl font-semibold">KIET Group of Institutions</p>
            <p className="text-sm">
              Delhi-NCR, Meerut Road, Ghaziabad, Uttar Pradesh 201206
            </p>
          </div>

          <div className="flex justify-center md:flex-col space-x-4 md:space-x-0 md:space-y-4 md:items-center md:justify-center">
            <div onClick={HandleClick}>
              <Link
                to="/"
                className={`text-lg cursor-pointer ${
                  location.pathname === "/"
                    ? "text-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                Home
              </Link>
            </div>
            <div onClick={HandleClick}>
              <Link
                to="/events"
                className={`text-lg cursor-pointer ${
                  location.pathname === "/events"
                    ? "text-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                Events
              </Link>
            </div>
            <div onClick={HandleClick}>
              <Link
                to="/members"
                className={`text-lg cursor-pointer ${
                  location.pathname === "/members"
                    ? "text-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                Members
              </Link>
            </div>
          </div>

          <div className=" mx-auto flex justify-center md:flex-col space-x-4 md:space-x-0 md:space-y-4 md:items-left md:justify-center">
            <a
              className="flex items-center hover:text-blue-500 transition-colors duration-300"
              href="https://www.linkedin.com/company/mlsa/"
            >
              <AiFillLinkedin size={24} />
              <span className="ml-2 hidden md:inline">LinkedIn</span>
            </a>
            <a
              className="flex items-center hover:text-blue-500 transition-colors duration-300"
              href="https://www.instagram.com/mlsa/"
            >
              <AiFillInstagram size={24} />
              <span className="ml-2 hidden md:inline">Instagram</span>
            </a>
            <a
              className="flex items-center hover:text-blue-500 transition-colors duration-300"
              href="mailto:mlsa@kiet.edu"
            >
              <AiFillMail size={24} />
              <span className="ml-2 hidden md:inline">Mail</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 pt-8 text-center">
        <p className="text-md">
          @{new Date().getFullYear()} Mlsa@Kiet. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer2;
