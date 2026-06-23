import React, { useEffect, useState } from "react";
import { getBooking } from "../utils/apiFunction";
import {
  sendEmailForCancellaion,
  SetOrderCompleted
} from "../utils/apiFunction";
import "./EditBooking.css";


const RunningBookings = ({ bookings, onCancel, onComplete }) => {
  console.log(bookings)
  if (bookings.length === 0) {
    return <p className="no-orders">No running bookings.</p>;
  }

  return (
    <>
      <h3 className="section-title">🟢 Running Bookings</h3>

      <table className="booking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>City</th>
            <th>Mobile No</th>
            <th>Booked Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, index) => (
            <tr key={b.id}>
              <td>{index + 1}</td>
              <td>{b.address}</td>
              <td>{b.city}</td>
              <td>{b.mobileNo}</td>
              <td>
                {b.bookedTime
                  ? new Date(b.bookedTime).toLocaleString()
                  : "-"}
              </td>
              <td style={{ display: "flex", gap: "6px" }}>
                <button
                  className="complete-btn"
                  onClick={() => onComplete(b)}
                >
                  ✅ Complete
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => onCancel(b)}
                >
                  ❌ Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

/* =======================
   CANCELLED BOOKINGS TABLE
======================= */
const CancelledBookings = ({ bookings }) => {
  if (bookings.length === 0) {
    return <p className="no-orders">No cancelled bookings.</p>;
  }

  return (
    <>
      <h3 className="section-title cancelled-title">🔴 Cancelled Bookings</h3>

      <table className="booking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>City</th>
            <th>Mobile No</th>
            <th>Booked Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, index) => (
            <React.Fragment key={b.id}>
              <tr className="cancelled-row">
                <td>{index + 1}</td>
                <td>{b.address}</td>
                <td>{b.city}</td>
                <td>{b.mobileNo}</td>
                <td>
                  {b.bookedTime
                    ? new Date(b.bookedTime).toLocaleString()
                    : "-"}
                </td>
                <td>
                  <span className="cancelled-text">Cancelled</span>
                </td>
              </tr>

              {b.reason && (
                <tr className="reason-row">
                  <td colSpan="6">
                    <strong>Reason:</strong> {b.reason}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

/* =======================
   COMPLETED BOOKINGS TABLE
======================= */
const CompletedBookings = ({ bookings }) => {
  if (bookings.length === 0) {
    return <p className="no-orders">No completed bookings.</p>;
  }

  return (
    <>
      <h3 className="section-title completed-title">✅ Completed Bookings</h3>

      <table className="booking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>City</th>
            <th>Mobile No</th>
            <th>Booked Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b, index) => (
            <tr key={b.id} className="completed-row">
              <td>{index + 1}</td>
              <td>{b.address}</td>
              <td>{b.city}</td>
              <td>{b.mobileNo}</td>
              <td>
                {b.bookedTime
                  ? new Date(b.bookedTime).toLocaleString()
                  : "-"}
              </td>
              <td>
                <span className="completed-text">Completed</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const EditBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getBooking();
      console.log(data);
      if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (booking) => {
    const reason = window.prompt(
      "Enter reason for cancellation:"
    );
    if (!reason) return;

    const data = {
      reason,
      bookedTime: booking.bookedTime
    };

    const res = await sendEmailForCancellaion(
      booking.email,
      data
    );

    if (res) {
      alert("Cancellation email sent");
      loadBookings();
    } else {
      alert("Failed to cancel booking");
    }
  };

  /* ✅ COMPLETE */
  const handleComplete = async (booking) => {
    const confirmComplete = window.confirm(
      "Mark this booking as completed?"
    );
    if (!confirmComplete) return;

    const res = await SetOrderCompleted(booking.bookedTime);

    if (res) {
      alert("Order marked as completed");
      loadBookings();
    } else {
      alert("Failed to mark order completed");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading bookings...</p>;
  }

  /* 🔍 FILTERS */
  const runningBookings = bookings.filter(
    (b) => b.enabled === true && b.completed === false
  );

  const cancelledBookings = bookings.filter(
    (b) => b.enabled === false && b.completed === false
  );

  const completedBookings = bookings.filter(
    (b) => b.enabled === false && b.completed === true
  );

  return (
    <div className="edit-booking-container">
      <h2>📋 User Bookings</h2>

      <RunningBookings
        bookings={runningBookings}
        onCancel={handleCancel}
        onComplete={handleComplete}
      />

      <CompletedBookings bookings={completedBookings} />

      <CancelledBookings bookings={cancelledBookings} />
    </div>
  );
};

export default EditBooking;
