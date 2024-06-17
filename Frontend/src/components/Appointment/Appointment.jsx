import React, { useEffect, useState } from "react";
import './Appointment.css';
import axios from "axios";
import { useParams } from "react-router-dom";

const Appointment = () => {
    const [slots, setSlots] = useState([]);
    const [week, setWeek] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [currentMonth, setCurrentMonth] = useState('');
    const { date, day } = useParams();

    useEffect(() => {
        fetchSlots();
        updateWeek();
        setCurrentMonth(getCurrentMonthName());
    }, [date, day]);

    const fetchSlots = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/slots', {
                params: {
                    date: date,
                    day: day
                }
            });
            if (response.data && Array.isArray(response.data.message)) {
                const filteredSlots = response.data.message.filter(slot => {
                    const slotDate = new Date(slot.date).toISOString().split('T')[0];
                    const slotDay = new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' });
                    return slotDate === date && slotDay === day;
                });

                // Sort the filteredSlots by StartTime
                const sortedSlots = filteredSlots.sort((a, b) => {
                    const timeA = new Date(`1970-01-01T${a.StartTime}Z`);
                    const timeB = new Date(`1970-01-01T${b.StartTime}Z`);
                    return timeA - timeB;
                });

                setSlots(sortedSlots);
            } else {
                console.error('Unexpected response structure:', response.data);
                setSlots([]);
            }
        } catch (error) {
            console.error('Unable to fetch the data', error);
            setSlots([]);
        }
    };

    const getCurrentMonthName = () => {
        const today = new Date();
        return today.toLocaleString('en-US', { month: 'long' });
    };

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
    };

    return (
        <div className="appoScreen">
            <div className="appoDate">
                <div className="todayDate">
                    <div id="date">
                        {date && <p>{new Date(date).getDate()}</p>}
                    </div>
                    <div className="todayMonth">
                        <div id="day">
                            {date && <p>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>}
                        </div>
                        <div id="month">
                            <p>{currentMonth}</p>
                        </div>
                    </div>
                </div>
                <div className="DocPhoto">
                    <img src="app_logo.png" alt="" />
                </div>
            </div>
            <div className="appoWeek">
                <div className="weekList">
                    {week.map((dayObj, index) => {
                        const dayOfWeek = dayObj.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayOfMonth = dayObj.toLocaleDateString('en-US', { day: 'numeric' });
                        const isSelected = dayOfWeek === day && dayObj.getDate() === new Date(date).getDate();
                        return (
                            <div
                                key={index}
                                className={`dayName ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleDayClick(index)}
                            >
                                <p>{dayOfWeek}</p>
                                <p>{dayOfMonth}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <hr width="100%" size="5" color="black"></hr>
            <div className="lableOfTable">
                <div className="fontLable">
                    <div id="tileLable"><p>Time</p></div>
                    <div id="detalisLable"><p>Schedule</p></div>
                </div>
                <div className="iconLable">
                
                </div>
            </div>
            <div className="appoTabel">
                {slots.map((slot, index) => (
                    <div key={index} className="apporow">
                        <div className="appoTime">
                            <p className="upperTime">{slot.StartTime}</p>
                            <p className="lowerTime">{slot.EndTime}</p>
                        </div>
                        <div className="patientBox">
                            {slot.booked && (
                                <>
                                    <div className="patientImg">
                                        <img src="" alt="" />
                                    </div>
                                    <div className="patientInfo">
                                        <p className="patientname"> NAME : {slot.username}</p>
                                        <p className="gender">GENDER : {slot.gender}</p>
                                        <p className="location">{slot.location}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointment;

