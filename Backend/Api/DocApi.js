
import express from "express"

const app = express()

 const Doc_info =  app.get('/doctor' , (req, res)=> {
  const doctor = [
    {
      "name": "Dr. Devi Prasad Shetty",
      "specialization": "Cardiac Surgery",
      "hospital": "Narayana Health",
      "location": "Bangalore",
      "experience": "30 years",
      "about": "Dr. Devi Prasad Shetty is a renowned cardiac surgeon and the founder of Narayana Health. He has performed over 15,000 heart operations and is known for his innovative techniques in cardiac surgery. He has been recognized for his contributions to affordable healthcare in India.",
      "contact": {
        "phone": "+91-80-2215-2215",
        "email": "contact@nhhospitals.org",
        "route": "/doc1"
      },
      "image": "https://img.freepik.com/free-photo/medium-shot-doctor-wearing-coat_23-2148816198.jpg?w=996&t=st=1718563716~exp=1718564316~hmac=25b4a2fbf849f5ca4c749d8436f15278aefc4511cd82b0fac8b3377c4290604c"
    },
    {
      "name": "Dr. Naresh Trehan",
      "specialization": "Cardiovascular and Cardiothoracic Surgery",
      "hospital": "Medanta - The Medicity",
      "location": "Gurgaon",
      "experience": "40 years",
      "about": "Dr. Naresh Trehan is a celebrated cardiovascular and cardiothoracic surgeon. He is the founder of Medanta - The Medicity, one of India's largest multi-specialty hospitals. Dr. Trehan has performed over 48,000 successful open-heart surgeries and is a recipient of numerous awards for his contribution to medicine.",
      "contact": {
        "phone": "+91-124-4141414",
        "email": "contact@medanta.org",
        "route": "/doc2"
      },
      "image":"https://img.freepik.com/free-photo/young-man-doctor-wearing-white-coat-stethoscope-looking-confident-with-crossed-arms_141793-12596.jpg?w=996&t=st=1718563471~exp=1718564071~hmac=ef51b06d819c4e664502f83c7bd1a6c83c608eba99bfb6327380765c84e65959"
    },
    {
      "name": "Dr. Randeep Guleria",
      "specialization": "Pulmonology",
      "hospital": "All India Institute of Medical Sciences (AIIMS)",
      "location": "New Delhi",
      "experience": "35 years",
      "about": "Dr. Randeep Guleria is a distinguished pulmonologist and the current Director of AIIMS, New Delhi. He is known for his extensive research in the field of respiratory diseases and his leadership during the COVID-19 pandemic. Dr. Guleria has authored numerous publications and is a respected figure in medical academia.",
      "contact": {
        "phone": "+91-11-26588500",
        "email": "director@aiims.edu",
        "route": "/doc3"
      },
      "image": "https://img.freepik.com/free-photo/portrait-handsome-male-doctor_171337-1533.jpg?w=996&t=st=1718565408~exp=1718566008~hmac=b033f479dea74ba06bff10faa6849e13b5bbed2d0e870e8a7c29a801c7ddfea3" 
    },
    {
      "name": "Dr. Ashok Seth",
      "specialization": "Interventional Cardiology",
      "hospital": "Fortis Escorts Heart Institute",
      "location": "New Delhi",
      "experience": "38 years",
      "about": "Dr. Ashok Seth is a pioneer in the field of interventional cardiology and is the Chairman of Fortis Escorts Heart Institute. He has performed one of the highest numbers of angioplasties and angiographies globally. Dr. Seth has been awarded numerous national and international accolades for his contributions to cardiology.",
      "contact": {
        "phone": "+91-11-47135000",
        "email": "info@fortisescorts.in",
        "route": "/doc4"
      },
      "image": "https://img.freepik.com/free-photo/front-view-smiley-doctor-with-stethoscope_23-2149551134.jpg?t=st=1718565354~exp=1718568954~hmac=a6660ef03bac4db88a53852e5effb9c0fd81e9d46ddf7e265c04dad8fb3ba08e&w=996" 
    },
    {
      "name": "Dr. B. K. Misra",
      "specialization": "Neurosurgery",
      "hospital": "Hinduja Hospital",
      "location": "Mumbai",
      "experience": "34 years",
      "about": "Dr. B. K. Misra is a highly esteemed neurosurgeon at Hinduja Hospital, Mumbai. He is known for his expertise in complex brain and spine surgeries. Dr. Misra is the first in South Asia to perform image-guided surgery for brain tumors and has received multiple awards for his pioneering work in neurosurgery.",
      "contact": {
        "phone": "+91-22-24452222",
        "email": "contact@hindujahospital.com",
        "route": "/doc5"
      },
      "image": "https://img.freepik.com/free-photo/nurse-portrait-hospital_23-2150780308.jpg?t=st=1718565316~exp=1718568916~hmac=bb71dba59bdcc189ce0a0cfde030bd2b62c0cbc39bf2a758749cd6d9fe3f2403&w=996" 
    },
    {
      "name": "Dr. Swati Patel",
      "specialization": "Pediatrics",
      "hospital": "Rainbow Children's Hospital",
      "location": "Hyderabad",
      "experience": "25 years",
      "about": "Dr. Swati Patel is a renowned pediatrician with over 25 years of experience. She specializes in child health and development and is known for her compassionate care. She is a senior consultant at Rainbow Children's Hospital.",
      "contact": {
        "phone": "+91-40-44444444",
        "email": "contact@rainbowhospitals.in",
        "route": "/doc6"
      },
      "image": "https://img.freepik.com/free-photo/pleased-young-female-doctor-medical-robe-with-stethoscope-puts-hand-chin-looks-camera-isolated-white-background-with-copy-space_141793-34529.jpg?t=st=1718564934~exp=1718568534~hmac=ba6b7e598e8fbc87a31c00298e0b859c0b7de49d934287bc1059ef947560eaa1&w=900"
    },
    {
      "name": "Dr. Aditi Sharma",
      "specialization": "Gynecology",
      "hospital": "Fortis La Femme",
      "location": "Delhi",
      "experience": "20 years",
      "about": "Dr. Aditi Sharma is a leading gynecologist at Fortis La Femme with over 20 years of experience. She specializes in women's health, including prenatal and postnatal care. She is known for her patient-centric approach and dedication.",
      "contact": {
        "phone": "+91-11-40554055",
        "email": "info@fortislafemme.in",
        "route": "/doc7"
      },
      "image": "https://img.freepik.com/free-photo/young-woman-doctor-white-coat-with-stethoscope-smiling-confident-standing-with-arms-crossed-white-wall_141793-47701.jpg?t=st=1718565231~exp=1718568831~hmac=30dd0356c37e8b58216699d9cb7381a793f45eb6f3e00272cc8e1dc5788f7f89&w=900"
    },
    {
      "name": "Dr. Pooja Singh",
      "specialization": "Dermatology",
      "hospital": "Apollo Hospitals",
      "location": "Chennai",
      "experience": "18 years",
      "about": "Dr. Pooja Singh is an experienced dermatologist at Apollo Hospitals, Chennai. She specializes in treating skin disorders and cosmetic dermatology. She has been recognized for her research in skin health and innovative treatments.",
      "contact": {
        "phone": "+91-44-28290200",
        "email": "contact@apollohospitals.com",
        "route": "/doc8"
      },
      "image": "https://img.freepik.com/free-photo/young-woman-doctor-white-coat-with-phonendoscope-with-serious-face-standing-blue-isolated-background_141793-9858.jpg?t=st=1718565260~exp=1718568860~hmac=7bb2cd1129f65199a5c42292b3acf1a03871cec246947716289f4dd11b87bf20&w=996"
    },

    
  ];
  
    res.send(doctor)
})

export {Doc_info} 