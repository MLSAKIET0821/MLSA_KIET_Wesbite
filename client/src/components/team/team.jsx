import React, { useEffect, useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import './team.css';
import Mainfooter from '../footer/mainfooter';

const MemberCard = ({ member }) => {
  return (
    <div className="line flex flex-col items-center mb-8"> 
      <div className="card bg-gray-900 flex flex-col items-center rounded-lg">
        <img
          src={member.profileImage}
          alt={member.name}
          className="img w-48 h-48 mb-4 rounded-full mt-4"
        />
        <h2 className="text-xl text-white font-bold text-center hover:underline mb-3 ">
          {member.name}
        </h2>
        <p className="text-gray-400 font-bold text-center  ">{member.domain}</p>
        <div className="flex flex-row justify-center mt-2">
          <div className="m-2">
            <a href={member.linkedlnIdId} target="_blank">
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
    <div className="bg-gray-900 w-50 h-50 hover:bg-gray-700 border-2 hover:border-blue-400 hover:border-solid-3 transition duration-150 ease-out hover:border-3 hover:ease-in shadow p-4  flex flex-col items-center rounded-lg mb-2">
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
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('https://mlsa-backend-4w03.onrender.com/api/member/Allmembers')
      .then((response) => response.json())
      .then((data) => setTeamMembers(data))
      .catch((error) => console.error('Error fetching team members:', error));
  }, []);

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
