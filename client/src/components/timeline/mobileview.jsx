import React, { useState, useEffect, useRef } from "react";
import "./timeline.css";
import AOS from "aos";
import "aos/dist/aos.css";
import timelineElements from "./timelineElements";
import { Motion } from "../framer-motion";
AOS.init();

function Line() {
  const [isVisible, setIsVisible] = useState(false);
  const lineRef = useRef(null);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0, // Adjust this value as per your requirement
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => {
      if (lineRef.current) {
        observer.unobserve(lineRef.current);
      }
    };
  }, []);

  let scrollValue = isVisible ? "h-[490px] duration-2000" : "h-0";

  return (
    <div>
    <div className="flex justify-center line-div">
      <div
        ref={lineRef}
        className={`bg-blue-800  w-o border-[1px] scrolled ${scrollValue}`}
      ></div>
    </div>

    
    
    </div>
  );
}

function MobileViewTimeline() {
  const renderDescriptionWithLinks = (description) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlPattern);
    return parts.map((part, index) => {
        if (urlPattern.test(part)) {
             return (
                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {part}
                </a>
            );
        } else {
            
            return <span key={index}>{part}</span>;
        }
    });
};
  return (
    <div className="bg-[#00070e] pb-4">
      <div className="text-center">
        <Motion.h1 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 110,
          delay: 0,
        }}
        className="py-10 text-4xl md:text-6xl font-bold mb-9 pb-10 bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent">
          How to be an MLSA?
        </Motion.h1>
      </div>
      <div className="flex justify-center main-div mx-2">
        <div>
          {timelineElements.map((element) => {
            return (
              <div
                key={element.id}
                className="flex justify-center main-div mt-10 mx-auto"
              >
                <div className="max-w-full md:max-w-md">
                  <Motion.div
                   initial={{ opacity: 0, y: 50, scale: 0 }}
                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.1, type: "spring", stiffness: 110, delay: 0 }}
                    key={element.id}
                    className="max-w-full border-2 border-[#7c7b7c] rounded-xl text-lg md:text-2xl bg-black text-white p-4"
                  >
                    <Motion.h1
                    
                    
                      key={element.id}
                     
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 0 }} 
                    
                      className="p-3 md:p-6 text-xl md:text-4xl font-bold mb-3 md:mb-9 text-center bg-gradient-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent"
                    >
                      {element.title}
                    </Motion.h1>
                    <Motion.p 
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: 0 }}
                  
                    key={element.id} className="px-3 md:px-6">
                    {renderDescriptionWithLinks(element.description)}
                    </Motion.p>
                  </Motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MobileViewTimeline;