import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingModal.css";
import {
  getTimeslots,
  getUserBooking,
  setUserBooking,
  getAddressDetails,      // ✅ ADDED
  setAddressDetails       // ✅ ADDED
} from "../utils/apiFunction";
import { useLocation, useNavigate } from "react-router-dom";

/* 🔐 LOCAL DATE FORMATTER (NO UTC SHIFT) */
const formatDateLocal = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const BookingModal = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const provider = state?.provider;

  /* 📅 SLOT STATES */
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  /* 🟢 AVAILABLE */
  const [availableSlots, setAvailableSlots] = useState({});
  const [availableDates, setAvailableDates] = useState([]);

  /* 🔴 BOOKED */
  const [bookedSlots, setBookedSlots] = useState({});

  /* 📍 USER DETAILS */
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  /* ✅ ONLY NEW STATES */
  const [savedAddress, setSavedAddress] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const allTimeSlots = [
    "09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00",
    "17:00","18:00","19:00","20:00"
  ];

  /* 🔐 AUTH + LOAD DATA */
  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole");
    if (!userRole) {
      navigate("/");
      return;
    }

    async function loadSlots() {

      /* ✅ FETCH SAVED ADDRESS (ADDED ONLY) */
      const addr = await getAddressDetails();
      if (addr) {
        setSavedAddress(addr);
        setAddress(addr.address || "");
        setCity(addr.city || "");
        setStateName(addr.state || "");
        setMobileNo(addr.mobileNo || "");
      }

      /* 🟢 AVAILABLE SLOTS */
      const data = await getTimeslots(provider.email);
      if (Array.isArray(data)) {
        const slotMap = {};
        data.forEach((slot) => {
          const value = typeof slot === "string" ? slot : slot?.start;
          if (!value || typeof value !== "string") return;
          const [date, time] = value.split("T");
          if (!slotMap[date]) slotMap[date] = [];
          slotMap[date].push(time.substring(0, 5));
        });
        setAvailableSlots(slotMap);
        setAvailableDates(Object.keys(slotMap));
      }

      /* 🔴 BOOKED SLOTS */
      const bookingData = await getUserBooking(provider.email);
      if (Array.isArray(bookingData)) {
        const bookedMap = {};
        bookingData.forEach((b) => {
          const value =
            typeof b === "string" ? b : b?.bookedTime || b?.start;
          if (!value || typeof value !== "string") return;
          const [date, time] = value.split("T");
          if (!bookedMap[date]) bookedMap[date] = [];
          bookedMap[date].push(time.substring(0, 5));
        });
        setBookedSlots(bookedMap);
      }
    }

    loadSlots();
  }, [navigate, provider?.email]);

  /* 📮 PINCODE → CITY & STATE (UNCHANGED) */
  const fetchCityState = async (pin) => {
    if (pin.length !== 6) return;
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await res.json();
    if (data[0]?.Status === "Success") {
      const po = data[0].PostOffice[0];
      setCity(po.Block);
      setStateName(po.State);
    }
  };

  /* ✅ SAVE ADDRESS (ADDED ONLY) */
  const handleSaveAddress = async () => {
    const res = await setAddressDetails({
      address,
      city,
      state: stateName,
      mobileNo
    });
    if (res) {
      console.log(res)
      setSavedAddress(res);
      setShowNewAddress(false);
    }
  };

  /* ✅ SUBMIT BOOKING (UNCHANGED) */
  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !address || !mobileNo)
      return;

    setLoading(true);

    const bookedTime = `${formatDateLocal(selectedDate)}T${selectedTime}:00`;

    const payload = {
      address,
      city,
      state: stateName,
      mobileNo,
      bookedTime
    };

    try {
      await setUserBooking(provider.email, payload);
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
        navigate("/");
      }, 2500);
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
            <h3>✅ Success</h3>
            <p>Booking successful</p>
          </div>
        </div>
      )}

      <div className="booking-modal">
        <div className="booking-card">

          <h2>Book Slot</h2>
          <div>
            <div style={{fontWeight:"bold",marginTop:"12px"} }>Service Provider:</div>
            <div>Address : {provider.address}</div>
            <div>Name : {provider.name}</div>
          </div>
          {/* 📍 ADDRESS (ONLY DISPLAY LOGIC ADDED) */}
          <div className="section">
            <h4>📍 Your Address</h4>

            {savedAddress && !showNewAddress && (
              <>
                <div className="location-preview">
                  <b>{savedAddress.address}</b><br />
                  {savedAddress.city}, {savedAddress.state}<br />
                  📞 {savedAddress.mobileNo}
                </div>

                <button
                  type="button"
                  style={{ marginTop: "10px" }}
                  onClick={() => setShowNewAddress(true)}
                >
                  + Add / New Address
                </button>
              </>
            )}

            {(!savedAddress || showNewAddress) && (
              <>
                <input
                  type="text"
                  placeholder="Enter full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    fetchCityState(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Enter mobile number"
                  value={mobileNo}
                  maxLength={10}
                  onChange={(e) => setMobileNo(e.target.value)}
                />

                {(city || stateName) && (
                  <div className="location-preview">
                    <strong>City:</strong> {city || "-"} <br />
                    <strong>State:</strong> {stateName || "-"}
                  </div>
                )}

                <button
                  type="button"
                  style={{ marginTop: "10px" }}
                  onClick={handleSaveAddress}
                >
                  Save Address
                </button>
              </>
            )}
          </div>

          {/* 📅 DATE */}
          <div className="section">
            <h4>📅 Select Date</h4>
            <DatePicker
              inline
              selected={selectedDate}
              onChange={setSelectedDate}
              minDate={new Date()}   
              filterDate={(d) =>
                availableDates.includes(formatDateLocal(d))
              }
            />
          </div>

          {/* ⏰ TIME */}
          <div className="section">
            <h4>⏰ Select Time</h4>
            <p className="notice-text">🔴 Red slots are already booked</p>

            <div className="time-grid">
              {allTimeSlots.map((time) => {
                const isAvailable = apiTimesForDate.includes(time);
                const isBooked = bookedTimesForDate.includes(time);
                return (
                  <button
                    key={time}
                    disabled={!isAvailable || isBooked}
                    className={`time-btn
                      ${selectedTime === time ? "active" : ""}
                      ${isBooked ? "booked-time" : ""}
                      ${!isAvailable ? "disabled" : ""}
                    `}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="confirm-btn"
            disabled={
              !selectedDate ||
              !selectedTime ||
              !address ||
              !mobileNo ||
              loading
            }
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Confirm Booking"}
          </button>

        </div>
      </div>
    </>
  );
};

export default BookingModal;
