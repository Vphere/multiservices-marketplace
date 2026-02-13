import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceProvider.css";
import { getEnabled } from "../utils/apiFunction";

const ServiceProvider = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function getenabled() {
      try {
        const data = await getEnabled();
        return data;
      } catch (e) {
        navigate("/serviceProviderForm");
      }
    }

    const userRole = sessionStorage.getItem("userRole");
    if (!(userRole && userRole.includes("ROLE_SERVICE"))) {
      if (!userRole) {
        navigate("/loginerror");
      }
    }

    getenabled().then((result) => {
      if (!result) navigate("/PendingRequest");
    });
  });

  return (
    <div className="sp-container">
      <div className="sp-card">
        <h2 className="sp-title">Manage Your Services</h2>
        <p className="sp-desc">
          Add, view, or update your service slots and bookings.
        </p>

        {/* ➕ ADD TIME SLOTS */}
        <button
          className="sp-btn"
          onClick={() => navigate("/services/bookService")}
        >
          ➕ Add Time Slots
        </button>

        <button
          className="sp-btn sp-secondary-btn"
          onClick={() => navigate("/services/removebooking")}
        >
          ❌ Remove Booking
        </button>

        {/* ✏️ VIEW / EDIT BOOKINGS */}
        <button
          className="sp-btn sp-secondary-btn"
          onClick={() => navigate("/services/editbooking")}
        >
          📋 View / Edit Bookings
        </button>
      </div>
    </div>
  );
};

export default ServiceProvider;
