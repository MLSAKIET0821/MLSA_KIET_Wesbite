import {React} from 'react'
import timelineElements from './timelineElements'
import './timeline.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { useEffect, useState,useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
import { Motion } from "../framer-motion";// For Motion in Text

AOS.init();

function Line2(){
    const [scrollState , setScrollState ] = useState(0)
    const [initialValue,setInitialValue] = useState(0)
    const [maxValue,setMaxValue] = useState(990)
    const svgRef = useRef(null)
    



    useEffect(()=>{
        const el = svgRef.current;
        gsap.fromTo(el,{translateY:initialValue},{translateY:maxValue , duration:5,ease:"slow", scrollTrigger:{
            trigger:el,
            start:'top top',
            end:'+=1000',
            
            scrub:1,
            
            

        }},)

    },[])

    let scrollValue = 'mainclass'
    let scrolled = 'scrolled'
    let scroll =0;
    const handleScroll = ()=>{
        setScrollState(window.scrollY)
    }
    // if(scrollState >500){
    //      scrollValue = 'mainclass'
    // }
    // else{
    //      scrollValue = ''
    // }
    // {
    // scrollState >= 500 && scrollState <750 ? scrollValue = 'base_line_1' : scrollState >=1000 && scrollState <1000 ? scrollValue = 'base_line_2' :scrollState >= 1000 && scrollState <1500?  scrollValue = 'base_line_3' :    scrollState >=1500 && scrollState <1700? scrollValue = 'base_line_4' : scrollState >= 1700 && scrollState <1900? scrollValue = 'base_line_5' :scrollState >= 2100 && scrollState<2300 ? scrollValue = 'base_line_6': scrollState >= 2300 && scrollState<2500 ? scrollValue = 'base_line_7': scrollValue = ''}
    // // : scrollState >=2740 && scrollState<2840? scrollValue = 'base_line_8':scrollState >=2840 && scrollState <2940 ? scrollValue = 'base_line_9': scrollState >=2940 && scrollState <3040 ? scrollValue = 'base_line_10':scrollState >=3040 && scrollState <3140 ?scrollValue = 'base_line_11':scrollState >=3140 && scrollState <3240 ? scrollValue = 'base_line_12':scrollState >=3240 && scrollState <3340 ? scrollValue = 'base_line_13':scrollValue = ''}

    window.addEventListener('scroll',handleScroll)
  
   

    return (
    <>
            {/* <div className={`content-center bg-blue-800 border-[1px] border-red-200 first_line`}></div> */}
                {/* <div  className={`xl:content-center bg-blue-800 border-[1px] border-red-700 2xl:mt-[-1070px] xl:mt-[-1070px] lg:mt-[-1070px] md:mt-[1050px] sm:mt-[1160px]  ${scrolled} ${scrollValue}`}></div> */}
                {/* {console.log(scrollState)} */}
                <div className=''>
                    <div  className={` bg-transparent ${scrollValue} absolute left-[49%] w-[20px] h-[1090px] top-[255%] `}>
                    <svg ref={svgRef} width="10" height="100">
                            <rect fill='#7DF9FF'  width="10" height="150" x="4"  />
                    </svg>
                    </div>

                </div>
    </>

    );
   
}

function Timeline() {
  const renderDescriptionWithLinks = (description) => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const parts = description.split(urlPattern);
    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {part}
          </a>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <>
      <div className="bg-black mt-0 h-full w-full md:h-full md:w-full lg:h-full lg:w-full xl:h-full xl:w-full  2xl:h-full 2xl:w-full">
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
        className=" text-center mt-0 py-16 text-6xl font-bold mb-8 m-auto bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent">
          How to be an MLSA
        </Motion.h1>
        {Array.isArray(timelineElements) &&
          timelineElements.map((elements, index) => {
            if (elements.id % 2 !== 0) {
              return (
                <>
            
                  <div
                    key={index}
                    className="flex xl:justify-start lg:justify-center sm: justify-center"
                  >
                    <div key={index} className="w-2/5 xl:mt-10 ml-24 lg:mt-10 ">
                      <Motion.h2
                      key={index}
                       initial={{ opacity: 0, x: -50 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: (index % 4) * 0.3 + 0.3 }} 
                      className="text-white  text-3xl font-bold">
                     
                        {elements.title}
                      </Motion.h2>
                      <br></br>
                      <Motion.p
                      key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: (index % 4) * 0.3 + 0.4 }}
                       
                        className="text-white text-justify 2xl:mb-0 xl:mb-0 lg:mb-0 sm:mb-8"
                      >
                        {elements.description}
                      </Motion.p>
                    </div>
                  </div>
                 
                </>
              );
            } else {
              return (
                <div
                  key={index}
                  className="flex xl:justify-end lg:justify-center sm:justify-center"
                >
                  <div className="w-2/5 xl:mt-10 mr-24 lg:mt-10 ml-48">
                    <Motion.h2 
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: (index % 4) * 0.3 + 0.3 }} 
                  
                    className="text-white text-3xl font-bold">
                      {elements.title}
                    </Motion.h2>
                    <br />
                    <Motion.p 
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 110, delay: (index % 4) * 0.3 + 0.4 }}
                    
                    className="text-white text-justify 2xl:mb-0 xl:mb-0 lg:mb-0 sm:mb-8">
                      {renderDescriptionWithLinks(elements.description)}
                    </Motion.p>
                  </div>
                </div>
              );
            }
          })}

        <Line2 />
      </div>
    </>
  );
}





export default Timeline;