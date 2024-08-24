import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AiFillLinkedin } from "react-icons/ai";
import './Carousel.css';
import { Motion } from "./framer-motion";// For Motion in Text

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides on desktop
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet breakpoint
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
        }
      },
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
        }
      }
    ]
  };

  return (
    <div>
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
      className="text-center mt-0 py-16 text-6xl font-bold mb-8 m-auto bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent">
        Our College MLSAs
      </Motion.h1>
      <div className='w-3/4 m-auto'>
        <div className="mt-20">
          <Slider {...settings} style={{ marginLeft: '-20px', marginRight: '-20px' }}>
            {data.map((d) => (
              <div key={d.name} className="card bg-gray-200 text-black rounded-xl relative">
                <div className='h-56 bg-blue-200 flex justify-center items-center rounded-t-xl'>
                  <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 p-4">
                  <p className="text-xl font-semibold">{d.name}</p>
                  <p className="text-center">{d.review}</p>
                  <a href={d.linkedin} target="_blank" rel="noopener noreferrer" className='connect-button bg-indigo-800 text-white text-lg px-6 py-1 rounded-xl flex items-center gap-2'>
                    <AiFillLinkedin /> Connect
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

const data = [
  {
    name: 'Yash Kumar Goel',
    img: '/yashsir.JPG',
    review: 'Being an MLSA is transformative. Access to Microsoft resources and a supportive community has greatly enhanced my technical and leadership skills. Highly recommended for passionate tech students.',
    linkedin: 'https://www.linkedin.com/in/yash-kumar-goel/'
  },
  {
    name: 'Ananya Srivastava',
    img: 'ananyamam.jpg',
    review: 'The MLSA program offers unparalleled learning opportunities, hands-on workshops, and valuable networking. It’s been crucial for my professional growth and skill development.',
    linkedin: 'https://www.linkedin.com/in/ananyasri14/'
  },
  {
    name: 'Praveer Nandan',
    img: 'praveer.jpg',
    review: 'Joining MLSA was a game-changer. The mentorship, resources, and community have significantly boosted my academic and professional journey. Ideal for students eager to excel in technology.',
    linkedin: 'https://www.linkedin.com/in/praveer-nandan-27537b204/'
  }
];

export default Carousel;
