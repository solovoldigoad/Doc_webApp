

import { useEffect, useState } from "react";
import TimePopUp from "../../assets/PopUp/PopUp";
import BookeedPopUp from "../../assets/BookedPopUp/BookedPopUp";
import { useNavigate } from "react-router-dom";
import './Slot.css'
import axios from "axios";

const Slot = () => {
    const [week, setWeek] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showBooked , setShowBooked] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null);
    const [username, setUserName] = useState('')
    const [location, setLocation] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [startTimeString, setStartTimeString] = useState('');
    const [endTimeString, setEndTimeString] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        updateWeek();
        const intervalId = setInterval(updateWeek, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const updateWeek = () => {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const weekDay = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            return day;
        });
        setWeek(weekDay);
    };

    const handleDayClick = (index) => {
        setSelectedDay(index);
        setShowPopup(true);
    };

    const handleClosePopUp = () => {
        setShowPopup(false);
    };

    const handleOpenBooked = () =>{
        setShowBooked(true)
    }

    const handleClosedBooked = () =>{
        setShowBooked(false)
    }

    const handleSaveTime =  async(hour, min) => {
        const selectedDate = week[selectedDay];
        const day = selectedDate.toLocaleDateString('en-US', { weekday: 'short' });
        const date = selectedDate.toISOString().split('T')[0]; // Use ISO string for date

        // Format StartTime as HH:MM
        const startTimeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    
        // Calculate EndTime as 5 minutes after StartTime
        let endHour = hour;
        let endMinute = min + 5;
    
        if (endMinute >= 60) {
            endMinute -= 60;
            endHour = (endHour + 1) % 24;
        }
    
        const endTimeString = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

        setStartTimeString(startTimeString);
        setDay(day);
        setDate(date);
        setEndTimeString(endTimeString);

        // Log the data to be sent
        console.log("Data to be sent:", {
            day,
            date,
            StartTime: startTimeString,
            EndTime: endTimeString
        });

    
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/slot/check`, {
                params: { // Ensure the parameters are correctly passed
                    day: day,
                    date: date,
                    StartTime: startTimeString,
                    EndTime: endTimeString
                }
            });
            if (!response.data.exists) {
                await handleSaveDetails();
            } else {
                handleOpenBooked();
                console.log('slot already exists:');
            }
        } catch (error) {
            console.error("Date has not been appointed ", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
        }
    };

    const handleSaveDetails = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/slot`, {
                StartTime: startTimeString,
                day: day,
                date: date,
                EndTime: endTimeString,
                username: username,
                location: location,
                phone: phone,
                gender: gender,
                booked: true
            });
            console.log("Response from server:", response.data);
            navigate(`/appointment/${date}/${day}`); // Navigate to Appointment with route parameters
        } catch (error) {
            console.error("Date has not been appointed ", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
        }
    };

    return (
        <div className="slotScreen">
            <div id="AppoientHeading">
                <h1 id="ScudalHeading">Schedule Appointment</h1>
                <h2 id = "SelectDate"> Select The Date For Appointment</h2>
            </div>
            <div className="week">
                {week.map((day, index) => (
                    <div
                        key={index}
                        className={`dayName ${selectedDay === index ? 'selected' : ''}`}
                        onClick={() => handleDayClick(index)}
                    >
                        <p>{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                        <p>{day.toLocaleDateString('en-US', { day: 'numeric' })}</p>
                    </div>
                ))}
            </div>
            {showPopup && (
                <TimePopUp onClose={handleClosePopUp} onSave={handleSaveTime} />
            )}
            {showBooked && (
                <BookeedPopUp onClosBook={handleClosedBooked}/>
            )}
            <div className="details">
                <h4 id="patient">DETAILS OF PATIENT</h4>
                <div className="info">
                    <input className='personalInfo' type="text" placeholder=" Name" value={username} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="info">
                    <input className='personalInfo' type="text" placeholder=" Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="info">
                    <input className='personalInfo' type="number" placeholder=" Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="info">
                    <input className='personalInfo' type="text" placeholder=" Gender : M / F" value={gender} onChange={(e) => setGender(e.target.value)} />
                </div>
                <button className="book" onClick={handleSaveDetails}>BOOK NOW</button>
            </div>
        </div>
    );
};

export default Slot;


