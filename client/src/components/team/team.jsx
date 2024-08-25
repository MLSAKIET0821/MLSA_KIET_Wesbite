import React from 'react';
import { AiFillLinkedin } from 'react-icons/ai';



import YashGoelImage from '../../assets/Team-Image/yashgoel.jpeg';
import AnanyaImage from '../../assets/Team-Image/ananyamam.jpg';
import KanishkImage from '../../assets/Team-Image/Kanisk-Jaiwal.jpg';
import KashishImage from '../../assets/Team-Image/Kashish-Tyagi.jpg';
import TanyaImage from '../../assets/Team-Image/Tanya.jpg';
import PiyushImage from '../../assets/Team-Image/piyush.png';
import SrishtiImage from '../../assets/Team-Image/Srishti.jpg';
import AnshikaJainImage from '../../assets/Team-Image/Anshika-Jain.jpg';
import ChandramouliImage from '../../assets/Team-Image/Chandramouli.jpg';
import AbhishekImage from '../../assets/Team-Image/Abhishek-Singh.jpg';
import SakshamImage from '../../assets/Team-Image/SAKSHAM.jpg';

import PraveerImage from '../../assets/Team-Image/Praveer.jpg';
import YashYadavImage from '../../assets/Team-Image/yash-yadav.jpg';


import KanishkaSharmaImage from '../../assets/Team-Image/Kanishka.jpg';
import UtkarshImage from '../../assets/Team-Image/Utkarsh.jpg';
import AnugyaImage from '../../assets/Team-Image/Anugya.jpg';

// import HarshImage from '../../assets/Team-Image/Harsh-Prajapati.jpg';
import SahilImage from '../../assets/Team-Image/Sahil_Panwar.jpg';






import Sidebar from '../sidenav/sidebar';
import Footer from '../footer/footer.jsx';
import { AiOutlineUser } from 'react-icons/ai';
import './team.css';
import Mainfooter from '../footer/mainfooter';

const MemberCard = ({ member }) => {
  return (
    <div className="line flex flex-col items-center mb-8"> 
      <div className="card bg-gray-900 flex flex-col items-center rounded-lg">
        <img
          src={member.image}
          alt={member.name}
          className="img w-48 h-48 mb-4 rounded-full mt-4"
        />
        <h2 className="text-xl text-white font-bold hover:underline mb-3 ">
          {member.name}
        </h2>
        <p className="text-gray-400 font-bold ">{member.role}</p>
        <div className="flex flex-row justify-center mt-2">
          <div className="m-2">
            <a href={member.gitlink} target="_blank">
              <AiFillLinkedin color="white" size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const FacultyCard = ({ member }) => {
  return (
    <div className="bg-gray-900 w-50 h-50 hover:bg-gray-700 border-2 hover:border-blue-400 hover:border-solid-3 transition duration-150 ease-out hover:border-3 hover:ease-in shadow p-4  flex flex-col items-center rounded-lg mb-2"> {/* Added mb-2 for vertical spacing */}
      <img
        src={member.image}
        alt={member.name}
        className="w-48 h-48 object-cover mb-4 rounded-full mt-4"
      />
      <h2 className="text-xl text-white hover:underline font-bold mb-3">
        {member.name}
      </h2>
      <p className="text-gray-500">{member.role}</p>
      <div className="flex flex-row justify-center mt-2">
        <div className="m-2">
          <a href={member.aboutLink}>
            <AiOutlineUser color="white" size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Yash Kumar Goel',
      role: 'Chapter Lead',
      image: YashGoelImage,
      gitlink: 'https://www.linkedin.com/in/yash-kumar-goel/',
    },
    {
      name: 'Ananya Shrivastava',
      role: 'Chapter Administrator',
      image: AnanyaImage,
      gitlink: 'https://www.linkedin.com/in/ananyasri14/',
    },
    {
      name: 'Kanishk Jaiswal',
      role: 'Sponsor manager',
      image: KanishkImage,
      gitlink: 'https://www.linkedin.com/in/kaniskjai',
    },
    {
      name: 'Kashish Tyagi',
      role: 'PR Lead',
      image: KashishImage,
      gitlink: 'https://www.linkedin.com/in/kashish-tyagi-70838a22a',
    },
    {
      name: 'Tanya Sharma',
      role: 'Technical Web Lead',
      image: TanyaImage,
      gitlink: 'https://www.linkedin.com/in/tanya-sharma05',
    },
    {
      name: 'Shrishti Upadhyay',
      role: 'Technical Android Lead',
      image: SrishtiImage,
      gitlink: 'https://www.linkedin.com/in/shrishti-upadhyay-055a01195',
    },
    {
      name: 'Anshika Jain',
      role: 'Event Manager',
      image: AnshikaJainImage,
      gitlink: 'https://www.linkedin.com/in/anshikaj2701',
    },
    {
      name: 'Piyush Sharma',
      role: 'Graphics Head',
      image:  PiyushImage,
      gitlink: 'https://www.linkedin.com/in/piyush-sharma-23ps',
    },
  
    {
      name: 'Anugya Gupta',
      role: 'Sponsor Engage Coordinators',
      image: AnugyaImage,
      gitlink: 'https://www.linkedin.com/in/anugya-gupta-a448b824b',
    },
    {
      name: 'Kanishka Sharma',
      role: 'Web Coordinators',
      image: KanishkaSharmaImage,
      gitlink: 'https://www.linkedin.com/in/kanishka-sharma-239235205/',
    },
    {
      name: 'Utkarsh Goyal',
      role: 'Web Coordinators',
      image: UtkarshImage,
      gitlink: 'https://www.linkedin.com/in/utkarsh-goyal-74a81524b/',
    },
    
    {
      name: 'Yash Yadav',
      role: 'Web Coordinators',
      image: YashYadavImage,
      gitlink: 'https://www.linkedin.com/in/yash-yadav23',
    },
    {
      name: 'Chandramouli Dubey',
      role: 'Event Coordinators',
      image: ChandramouliImage,
      gitlink: 'https://www.linkedin.com/in/chandramouli-dhar-dubey',
    },
    {
      name: 'Abhishek Singh',
      role: 'Event Coordinators',
      image: AbhishekImage,
      gitlink: 'https://www.linkedin.com/in/abhisheksingh2004',
    },
    {
      name: 'Sahil Panwar',
      role: 'Event Coordinators',
      image: SahilImage,
      gitlink: 'https://www.linkedin.com/in/kanishka-sharma-239235205',
    },
    {
      name: 'Saksham Jain',
      role: 'Event Coordinators',
      image: SakshamImage,
      gitlink: 'https://www.linkedin.com/in/sakshamjain007',
    },
    
    {
      name: 'Praveer Nandan',
      role: 'Video Editor & Social Media Team',
      image: PraveerImage,
      gitlink: 'https://www.linkedin.com/in/praveer-nandan-27537b204',
    },
  ];

  const facultyMembers = [
    {
      name: 'Dr Vineet Kumar Sharma',
      role: 'Chief Patron',
      image: 'HOD.jpg',
      aboutLink: 'https://www.kiet.edu/home/department_wise_faculty_detail/NQ==/Nw==',
    },
    {
      name: 'Dr Seema Maitrey',
      role: 'Faculty Coordinator',
      image: 'mam.jpg',
      aboutLink: 'https://www.kiet.edu/home/department_wise_faculty_detail/NQ==/MjA1',
    },
  ];

  return (
    <div>
      <div className="container mx-auto mb-10 pl-4">
        <div className="text-center">
          <h1 className="py-10 text-6xl font-bold mb-9 pb-10 bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent">
            Faculty Coordinators
          </h1>
        </div>

        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 gap-x- lg:grid-cols-2 mb-20 xl:grid-cols-2">
          {facultyMembers.map((member, index) => (
            <FacultyCard key={index} member={member} />
          ))}
        </div>

        <div className="text-center mt-3">
          <h1 className="py-16 text-6xl font-bold mb-8 m-auto bg-gradient-to-r from-sky-500 to-blue-400 bg-clip-text text-transparent">
            Our Team
          </h1>
        </div>

        <div className="grid place-items-center grid-cols-1 md:grid-cols-2 gap-x-6 lg:grid-cols-2  xl:grid-cols-3 ">
          {teamMembers.map((member, index) => (
            <MemberCard key={index} member={member} className="mb-8" />
          ))}
        </div>
      </div>
      <Mainfooter className="mt-5" />
    </div>
  );
};

export default TeamPage;
