import React from 'react';
import Footer from '../footer/footer.jsx';

const AboutUs = () => {
  return (
    <>
    <div className=" mx-auto  shadow-md overflow-hidden sm:pt-11">
      
      <div className="lg:flex">
        
        <div className="p-8 sm:pl-16 pt-14 sm:pt-0">
          <div className="uppercase tracking-wide text-2xl sm:text-6xl text-indigo-500 font-bold text-center sm:text-left">About Us</div>
            <p className="sm:mt-12 mt-4 text-white sm:text-xl">
              Welcome to The MLSA club, where freedom and innovation converge. We are dedicated to empowering individuals with the liberating force of open-source software. Over the past year, we have conducted engaging sessions, organized Linux installation drives, and hosted captivating coding events and hackathons. Together, we have witnessed the transformative power of collaboration and the limitless possibilities it brings.
            </p>
            <p className="mt-2  sm:mt-4 text-white sm:text-xl">
              As we forge ahead, our commitment to expanding our community and contributing to larger-scale open-source projects burns brighter than ever. Join us at The MLSA club and let's celebrate the journey of freedom, creativity, and boundless minds.
            </p>
            
        </div>

        <div className="lg:shrink">
          <img className="h-48 w-full object-cover lg:h-full lg:w-auto" src="/src/components/About/group.jpg" alt="About"/>
        </div>
        
      </div>
      

    </div>
    
    
    <section className="mt-80">
       <Footer />
    </section>
    </>
  );
};

export default AboutUs;

