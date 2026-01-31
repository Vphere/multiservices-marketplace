import React from "react";
import "./Pending.css";

const Pending = () => {
  return (
    <div className="pending-container">
      <div className="pending-card">
        <div className="spinner"></div>
        <h1>Request Pending ⏳</h1>
        <p>
          Your request is currently under review.  
          Please wait while we verify your details.
        </p>
        <small>We’ll notify you once it’s approved.</small>
      </div>
    </div>
  );
};

export default Pending;
