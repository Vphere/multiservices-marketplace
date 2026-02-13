import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RemoveBooking.css";
import {
  getTimeslotsForService,
  getBooking,
  deleteBooking
} from "../utils/apiFunction";
import { useNavigate } from "react-router-dom";

/* 🔐 LOCAL DATE FORMATTER (NO UTC SHIFT) */
const formatDateLocal = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const RemoveBooking = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);

  // ⭐ MULTI DATE + MULTI TIME
  const [selectedSlots, setSelectedSlots] = useState([]);

  const [availableSlots, setAvailableSlots] = useState({});
  const [availableDates, setAvailableDates] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});

  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const allTimeSlots = [
    "09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00",
    "17:00","18:00","19:00","20:00"
  ];

  // 🔐 AUTH + LOAD DATA
  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole");
    if (!(userRole && userRole.includes("ROLE_SERVICE"))) {
      navigate(userRole ? "/serviceerror" : "/loginerror");
      return;
    }

    async function loadSlots() {
      /* 🟢 AVAILABLE SERVICE SLOTS */
      const data = await getTimeslotsForService();
      if (Array.isArray(data)) {
        const map = {};
        data.forEach((slot) => {
          const value = typeof slot === "string" ? slot : slot?.start;
          if (!value) return;

          const [date, time] = value.split("T");
          if (!map[date]) map[date] = [];
          map[date].push(time.substring(0, 5));
        });

        setAvailableSlots(map);
        setAvailableDates(Object.keys(map));
      }

      /* 🔴 BOOKED SLOTS (ONLY bookedTime + enabled = 1) */
      const bookingDataOrg = await getBooking();
      const bookingData = bookingDataOrg.filter(
        (b) => b.enabled === true
      );

      console.log(bookingData)
      if (Array.isArray(bookingData)) {
        const map = {};
        bookingData.forEach((b) => {
          const value = b.bookedTime; // ✅ ONLY bookedTime
          if (!value) return;

          const [date, time] = value.split("T");
          if (!map[date]) map[date] = [];
          map[date].push(time.substring(0, 5));
        });
        setBookedSlots(map);
      }
    }

    loadSlots();
  }, [navigate]);

  // ➕ ADD / REMOVE SLOT
  const toggleSlot = (time) => {
    if (!selectedDate) return;

    const dateStr = formatDateLocal(selectedDate);
    const slot = `${dateStr}T${time}:00`;

    setSelectedSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

  // 🗑️ DELETE
  const handleDelete = async () => {
    if (selectedSlots.length === 0) return;

    setLoading(true);
    try {
      const payload = selectedSlots.map((slot) => ({
        start: slot,
      }));

      console.log(payload); // 🔍 verify payload

      await deleteBooking(payload);

      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
        navigate("/");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const selectedDateStr = selectedDate
    ? formatDateLocal(selectedDate)
    : null;

  const apiTimesForDate = availableSlots[selectedDateStr] || [];
  const bookedTimesForDate = bookedSlots[selectedDateStr] || [];

  return (
    <>
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>✅ Done</h3>
            <p>Selected slots sent successfully</p>
          </div>
        </div>
      )}

      <div className="booking-modal">
        <div className="booking-card">

          <h2>Remove Slots</h2>

          {/* 📅 DATE */}
          <div className="section">
            <h4>📅 Select Date</h4>
            <DatePicker
              inline
              selected={selectedDate}
              onChange={setSelectedDate}
              minDate={new Date()}
              filterDate={(date) =>
                availableDates.includes(formatDateLocal(date))
              }
            />
          </div>

          {/* ⏰ TIME */}
          <div className="section">
            <h4>⏰ Select Time</h4>
            <p className="notice-text">
              🔴 Red slots are booked & cannot be removed
            </p>

            <div className="time-grid">
              {allTimeSlots.map((time) => {
                const isAvailable = apiTimesForDate.includes(time);
                const isBooked = bookedTimesForDate.includes(time);
                const slotKey = selectedDateStr
                  ? `${selectedDateStr}T${time}:00`
                  : "";

                return (
                  <button
                    key={time}
                    disabled={!isAvailable || isBooked}
                    className={`time-btn
                      ${selectedSlots.includes(slotKey) ? "active" : ""}
                      ${isBooked ? "booked-time" : ""}
                      ${!isAvailable ? "disabled" : ""}
                    `}
                    onClick={() => toggleSlot(time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 📋 SELECTED LIST */}
          {selectedSlots.length > 0 && (
            <div className="section">
              <h4>🧾 Selected Slots</h4>
              <ul className="remove-list">
                {selectedSlots.map((s) => (
                  <li key={s}>
                    {s.replace("T", " ").replace(":00", "")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="confirm-btn danger"
            disabled={selectedSlots.length === 0 || loading}
            onClick={handleDelete}
          >
            {loading ? "Deleting..." : "Delete & Save"}
          </button>

        </div>
      </div>
    </>
  );
};

export default RemoveBooking;
