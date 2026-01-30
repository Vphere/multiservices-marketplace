import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookService.css";
import { getTimeslots, setTimeslot } from "../utils/apiFunction";
import { useNavigate } from "react-router-dom";

const BookService = () => {
  const navigate = useNavigate();

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔔 dialog state
  const [showDialog, setShowDialog] = useState(false);

  const timeSlots = [
    "09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00",
    "17:00","18:00","19:00","20:00"
  ];

  // 📅 MULTI-DATE TOGGLE
  const handleDateSelect = (date) => {
    const selected = date.toISOString().split("T")[0];

    setSelectedDates((prev) => {
      const exists = prev.some(
        d => d.toISOString().split("T")[0] === selected
      );

      return exists
        ? prev.filter(d => d.toISOString().split("T")[0] !== selected)
        : [...prev, new Date(date)];
    });
  };

  // ⏰ TIME TOGGLE
  const toggleTime = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  // 🔥 CREATE SLOT DTOs
  const generateSlotDtos = () => {
    const slots = [];

    selectedDates.forEach(date => {
      const dateStr = date.toISOString().split("T")[0];
      selectedTimes.forEach(time => {
        slots.push({ start: `${dateStr}T${time}` });
      });
    });

    return slots;
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    setLoading(true);
    const slotDtos = generateSlotDtos();

    try {
      await setTimeslot(slotDtos);

      // ✅ show dialog
      setShowDialog(true);

      // ⏳ hide dialog + redirect after 3 sec
      setTimeout(() => {
        setShowDialog(false);
        navigate("/services/editService");
      }, 3000);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 LOAD BLOCKED DATES + AUTH CHECK
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");    
    if(!(userRole && userRole.includes("ROLE_SERVICE"))){
        if(!userRole){
          navigate("/loginerror");
        }
        else{
          navigate("/serviceerror");
        }
    }
    async function loadSlots() {
      const data = await getTimeslots();
      if (!data) return;

      const datesInUse = data.map(slot =>
        (slot.start || slot).split("T")[0]
      );

      setBlockedDates([...new Set(datesInUse)]);
    }

    loadSlots();
  }, [navigate]);

  return (
    <>
      {/* ✅ SUCCESS DIALOG */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>✅ Success</h3>
            <p>Book slot successfully</p>
          </div>
        </div>
      )}

      <div className="booking-modal">
        <div className="booking-card">

          <h2>Add Service Slots</h2>

          {/* DATE PICKER */}
          <div className="section">
            <h4>📅 Select Dates</h4>

            <DatePicker
              inline
              minDate={new Date()}
              selected={null}
              onChange={handleDateSelect}
              highlightDates={selectedDates}
              filterDate={(date) =>
                !blockedDates.includes(
                  date.toISOString().split("T")[0]
                )
              }
            />
          </div>

          {/* TIME SLOTS */}
          <div className="section">
            <h4>⏰ Select Time Slots</h4>

            <div className="time-grid">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  disabled={!selectedDates.length}
                  className={`time-btn ${
                    selectedTimes.includes(time) ? "active" : ""
                  }`}
                  onClick={() => toggleTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button
            className="confirm-btn"
            disabled={
              loading ||
              !selectedDates.length ||
              !selectedTimes.length
            }
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Confirm Slots"}
          </button>

        </div>
      </div>
    </>
  );
};

export default BookService;
