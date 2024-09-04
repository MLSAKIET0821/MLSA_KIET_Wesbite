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
    name: 'Praveer Nandan',
    img: '/praveer.jpg',
    review: ' <b> Graphics </b> Head who manages the graphics team and oversees digital marketing strategies. Praveer’s creative vision and leadership ensure that our visual content is engaging, effective, and consistently high-quality.',
    linkedin: 'https://www.linkedin.com/in/praveer-nandan-27537b204'
  },
  {
    name: 'Anugya Gupta',
    img: '/Anugya.jpg',
    review: ' <b> Sponsor and Engagement  </b>, Community Manager. Anugya is instrumental in managing all events. Her dedication to fostering community engagement  greatly contributes to our club’s success.',
    linkedin: 'https://www.linkedin.com/in/anugya-gupta-74a81524b'
  },
  {
    name: 'Kanishka Sharma',
    img: '/Kanishka.jpg',
    review: ' <b> Web Co-Lead  </b> who played a pivotal role in the creation and development of our website. Kanishka’s contributions have been crucial in building a functional and user-friendly platform for our community.',
    linkedin: 'https://www.linkedin.com/in/kanishka-sharma-239235205'
  },
  {
    name: 'Saksham Jain',
    img: '/SAKSHAM.jpg',
    review: ' <b> Overall Coordinator  </b> who plays a key role in ensuring the smooth operation of the club and all its domains. Saksham’s ability to coordinate and assist across various functions makes him an invaluable asset.',
    linkedin: 'https://www.linkedin.com/in/sakshamjain007'
  }
];


export default Carousel;
