import express from "express";

const app = express();

 const Hospitla_info = app.get('/hospital', (req, res) => {
  const hospitals = [
    {
      "name": "Narayana Health",
      "years_old": "20 years",
      "phone": "+91-80-2215-2215",
      "location": "Bangalore",
      "about": "Narayana Health is a multispecialty hospital network founded by Dr. Devi Prasad Shetty. It is known for its cardiac care and has performed thousands of successful surgeries. The hospital is recognized for its innovative healthcare solutions and affordability.",
      "image": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "name": "Medanta - The Medicity",
      "years_old": "15 years",
      "phone": "+91-124-4141414",
      "location": "Gurgaon",
      "about": "Medanta - The Medicity is one of India's largest multi-specialty hospitals founded by Dr. Naresh Trehan. It is known for its comprehensive cardiac and cancer care programs. The hospital has a state-of-the-art infrastructure and offers advanced medical treatments.",
      "image": "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "name": "All India Institute of Medical Sciences (AIIMS)",
      "years_old": "66 years",
      "phone": "+91-11-26588500",
      "location": "New Delhi",
      "about": "AIIMS is a premier medical institute and hospital in India. It offers a wide range of medical and surgical treatments and is known for its research and educational programs. AIIMS has been at the forefront of medical innovation and patient care.",
      "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "name": "Fortis Escorts Heart Institute",
      "years_old": "35 years",
      "phone": "+91-11-47135000",
      "location": "New Delhi",
      "about": "Fortis Escorts Heart Institute is a leading cardiac care center in India. It specializes in interventional cardiology and cardiac surgeries. The hospital is equipped with advanced technology and provides high-quality cardiac care services.",
      "image": "https://images.unsplash.com/photo-1587351021355-a479a299d2f9?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      "name": "Hinduja Hospital",
      "years_old": "65 years",
      "phone": "+91-22-24452222",
      "location": "Mumbai",
      "about": "Hinduja Hospital is a well-known multi-specialty hospital in Mumbai. It offers a range of medical services including neurosurgery, orthopedics, and oncology. The hospital is known for its patient-centric approach and advanced medical treatments.",
      "image": "https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=1024x1024&w=gi&k=20&c=2nU8Ac2_g9NiiRTgZXfBqSRx50tR4x8R7io7X1OCUFg="
    },
    {
      "name": "Rainbow Children's Hospital",
      "years_old": "22 years",
      "phone": "+91-40-44444444",
      "location": "Hyderabad",
      "about": "Rainbow Children's Hospital specializes in pediatric care and has a team of experienced pediatricians. The hospital provides comprehensive child health services and is known for its compassionate care and advanced treatments.",
      "image": "https://media.gettyimages.com/id/1312706504/photo/modern-hospital-building.jpg?s=1024x1024&w=gi&k=20&c=RXpNBi29PyBzIPD7aWekJImubSm_mZuCXrYCZsRCPDQ="
    },
    {
      "name": "Fortis La Femme",
      "years_old": "14 years",
      "phone": "+91-11-40554055",
      "location": "Delhi",
      "about": "Fortis La Femme is a specialized hospital for women's health. It offers a range of services including gynecology, obstetrics, and neonatal care. The hospital is dedicated to providing high-quality healthcare for women and children.",
      "image": "https://media.gettyimages.com/id/182344359/photo/hospital.jpg?s=1024x1024&w=gi&k=20&c=zHGqiljt4ZWL1-SSILxcjT9OrDnZmBaIpv7Eop8QOA4="
    },
    {
      "name": "Apollo Hospitals",
      "years_old": "40 years",
      "phone": "+91-44-28290200",
      "location": "Chennai",
      "about": "Apollo Hospitals is a leading healthcare provider in India with a network of hospitals across the country. It offers a wide range of medical and surgical services and is known for its innovative healthcare solutions and patient care.",
      "image": "https://media.gettyimages.com/id/157525237/photo/modern-scottsdale-medical-business-building.jpg?s=1024x1024&w=gi&k=20&c=31YwSHWMfRfsAIdxp03BKMDMJVXz8-aBSftTjM5gFKk="
    }
  ];

  res.send(hospitals);
});

export {Hospitla_info}
