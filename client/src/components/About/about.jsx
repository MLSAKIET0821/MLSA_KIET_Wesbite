import React from 'react';
import Footer from '../footer/footer.jsx';
import { MdPeopleOutline } from 'react-icons/md';
import { GiTeacher } from "react-icons/gi"; 
import { GiFist } from "react-icons/gi"; 
import Carousel from "../Carousel.jsx"
import Main_timeline from '../timeline/main_timeline.jsx';
import Mainfooter from '../footer/mainfooter.jsx';

import { Motion } from "../framer-motion";// For Motion in Text 



const AboutUs = () => {
  return (
    <>
    <div className=" mx-auto overflow-hidden sm:pt-2 ml-6 lg:ml-20 mt-5  ">
      
      <div className="lg:flex">
        
        <div className="p-8 sm:pl-16 pt-4 sm:pt-0">

          <Motion.div 
           initial={{ opacity: 0, x: -100 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{
             duration: 0.8,
             type: "spring",
             stiffness: 110,
             delay: 0,
           }}
          className="tracking-wide text-2xl sm:text-6xl text-blue-400 font-bold text-center sm:text-left">About Us
          </Motion.div>

          <Motion.p
           initial={{ opacity: 0, x: -100 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{
             duration: 0.8,
             type: "spring",
             stiffness: 110,
             delay: 0,
           }}
             className="sm:mt-12 mt-4 text-2xl text-bold  text-white sm:text-xl">
            Microsoft Learn Student Ambassadors, passionate and tech-savvy, promote digital literacy and tech skills in academic communities. They bridge Microsoft and peers, advocating for technology adoption and fostering innovation. Through workshops and mentorship
            </Motion.p>

        </div>
     
        <Motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 110,
          delay: 0,}}
         className="lg:shrink flex justify-center"> {/* Center the image */}
  <img className="h-48 sm:w-3/4 lg:h-full lg:w-auto px-2 rounded-2xl" src="group.png" alt="About" /> {/* Adjusted width for small screens */}
       </Motion.div>
        
      </div>
      

    </div>

    <Motion.section 
    className="py-12 sm:mt-35 mt-10">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-9 text-white sm:mx-20">
          <Motion.div
           initial={{ opacity: 0, x: -100 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{
             duration: 0.8,
             type: "spring",
             stiffness: 110,
             delay: 0,}}
           className="text-center">
            <MdPeopleOutline className="mx-auto text-blue-400" style={{ fontSize: '90px'}}/>
            <p className="mt-4 text-xl text-bold">Our primary objective is to empower students with the tools and knowledge needed to thrive in the digital age. By championing Microsoft technologies.</p>
  
          </Motion.div>
         
          <Motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 110,
            delay: 0,}}
          className="text-center">
            <GiTeacher className="text-blue-400 mx-auto" style={{fontSize: '90px'}} />
            <p className="mt-4 text-xl text-bold ">At the heart of our mission is the cultivation of innovation and collaboration. We strive to create a community where students can come together to exchange ideas, solve problems, and unleash their creativity</p>
          </Motion.div>

          <Motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 110,
            delay: 0,}}
           className="text-center">
            <GiFist className="text-blue-400 mx-auto" style={{fontSize: '90px'}} />
            <p className="mt-4 text-xl text-bold">As MLSAs, we are committed to bridging the gap between the classroom and the real world. Our goal is to provide students with practical experiences, industry insights, and networking opportunities.</p>
          </Motion.div>
          

        </div>
      </div>
    </Motion.section>
    <Main_timeline/>
   
    <Carousel/>
    <section className="sm:mt-35 mt-10 ">
       <Mainfooter />
     
      
    </section>
    </>
  );
};

export default AboutUs;