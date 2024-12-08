import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AiFillLinkedin } from "react-icons/ai";
import './Carousel.css';
import parse from "html-react-parser";
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, 
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
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
          delay: 1,
        }}
        className="text-center mt-0 py-16 text-6xl font-bold mb-8 bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent">
        Our Chapter Leads
      </Motion.h1>
      <div className='w-11/12 md:w-3/4 m-auto'>
        <div className="mt-20">
          <Slider {...settings}>
            {data.map((d) => (
              <div key={d.name} className="card bg-gray-200 text-black rounded-xl relative overflow-hidden">
                <div className='h-56 bg-blue-200 flex justify-center items-center rounded-t-xl'>
                  <img src={d.img} alt={d.name} className="h-44 w-44 rounded-full object-cover"/>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 p-4">
                  <p className="text-xl font-semibold">{d.name}</p>
                  <p className="text-center">{parse(d.review)}</p>
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
    review: '<b>Chapter Lead </b> with a vision to connect like-minded individuals under one hub. Yash is dedicated to fostering collaboration and creating a strong community that thrives on mutual support and shared goals.',
    linkedin: 'https://www.linkedin.com/in/yash-kumar-goel/'
  },
  {
    name: 'Ananya Srivastava',
    img: '/ananyamam.jpg',
    review: 'As <b> Chapter Administrator </b>, Ananya ensures smooth coordination of all events and activities. Her exceptional organizational skills and attention to detail help maintain a seamless flow, making every event a success.',
    linkedin: 'https://www.linkedin.com/in/ananyasri14/'
  },
  {
    name: 'Utkarsh Goyal',
    img: '/Utkarsh.jpg',
    review: '<b> Web Lead </b> responsible for creating and maintaining the club’s website. Utkarsh has enhanced accessibility and user experience through innovative web design and development.',
    linkedin: 'https://www.linkedin.com/in/utkarsh-goyal-74a81524b'
  },
  {
    name: 'Kanishka Sharma',
    img: '/Kanishka.jpg',
    review: ' <b> Web Co-Lead  </b> who played a pivotal role in the creation and development of our website. Kanishka’s contributions have been crucial in building a functional and user-friendly platform for our community.',
    linkedin: 'https://www.linkedin.com/in/kanishka-sharma-239235205'
  }
];


export default Carousel;
