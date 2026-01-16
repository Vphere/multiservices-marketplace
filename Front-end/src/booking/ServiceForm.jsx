import React, { useState } from "react";

const ServiceForm = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const formatTime = (hour, minute = 0) => {
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  const generateSlots = () => {
    if (!startTime || !endTime) return;

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    let start = startH * 60 + startM;
    let end = endH * 60 + endM;

    if (start >= end) {
      alert("End time must be greater than start time");
      return;
    }

    let generated = [];

    while (start + duration <= end) {
      const fromH = Math.floor(start / 60);
      const fromM = start % 60;
      const toH = Math.floor((start + duration) / 60);
      const toM = (start + duration) % 60;

      generated.push(
        `${formatTime(fromH, fromM)} - ${formatTime(toH, toM)}`
      );

      start += duration;
    }

    setSlots(generated);
    setSelectedSlot("");
  };

  return (
    <div className="card p-4 shadow mt-4">
      <h5 className="fw-bold mb-3">Select Working Time</h5>

      {/* Time Range */}
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Start Time</label>
          <input
            type="time"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="col">
          <label className="form-label">End Time</label>
          <input
            type="time"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      {/* Slot Duration */}
      <div className="mb-3">
        <label className="form-label">Slot Duration</label>
        <select
          className="form-select"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          <option value={30}>30 Minutes</option>
          <option value={60}>1 Hour</option>
        </select>
      </div>

      <button className="btn btn-primary w-100 mb-3" onClick={generateSlots}>
        Apply
      </button>

      {/* Generated Slots */}
      {slots.length > 0 && (
        <>
          <h6 className="fw-bold">Available Slots</h6>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {slots.map((slot, index) => (
              <button
                key={index}
                className={`btn ${
                  selectedSlot === slot ? "btn-success" : "btn-outline-primary"
                }`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Selected Slot */}
      {selectedSlot && (
        <div className="alert alert-success mt-3">
          Selected Slot: <strong>{selectedSlot}</strong>
        </div>
      )}
    </div>
  );
};

export default ServiceForm;
