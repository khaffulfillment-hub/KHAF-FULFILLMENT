import React from 'react';
import { ProfileCard } from './ProfileCard'; // Assuming ProfileCard is in the same directory
import { Typography } from "@material-tailwind/react"; // Import Typography for the section title

// Import social media icons
import facebookIcon from '../assets/icons8-facebook-48.png';
import instagramIcon from '../assets/icons8-instagram-48.png';
import twitterIcon from '../assets/icons8-twitter-bird-48.png';

const teamMembers = [
  {
    name: "Natalie Paisley",
    title: "CEO / Co-Founder",
    imageUrl: "https://docs.material-tailwind.com/img/team-3.jpg",
    socialLinks: [
      { url: "#facebook", label: "Like", color: "blue", imageUrl: facebookIcon },
      { url: "#twitter", label: "Follow", color: "light-blue", imageUrl: twitterIcon },
      { url: "#instagram", label: "Follow", color: "purple", imageUrl: instagramIcon },
    ],
  },
  {
    name: "John Smith",
    title: "CTO",
    imageUrl: "https://docs.material-tailwind.com/img/team-2.jpg", // Placeholder image
    socialLinks: [
      { url: "#facebook", label: "Like", color: "blue", imageUrl: facebookIcon },
      { url: "#twitter", label: "Follow", color: "light-blue", imageUrl: twitterIcon },
      { url: "#instagram", label: "Follow", color: "purple", imageUrl: instagramIcon },
    ],
  },
  {
    name: "Emily Davis",
    title: "Lead Developer",
    imageUrl: "https://docs.material-tailwind.com/img/team-1.jpg", // Placeholder image
    socialLinks: [
      { url: "#twitter", label: "Follow", color: "light-blue", imageUrl: twitterIcon },
      { url: "#instagram", label: "Follow", color: "purple", imageUrl: instagramIcon },
    ],
  },
];

export function TeamSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <Typography variant="h2" color="blue-gray" className="mb-8">
          Our Team
        </Typography>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <ProfileCard
              key={index}
              name={member.name}
              title={member.title}
              imageUrl={member.imageUrl}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
