import React from "react";
import "./ServiceError.css";

const ServiceError = () => {
  return (
    <div className="service-error-container">
      <div className="service-error-card">
        <div className="icon">🚫</div>
        <h1>Access Denied</h1>
        <p>
          You do not have permission to access this service.
          Please contact the administrator or try a different account.
        </p>
        <button
          className="back-btn"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ServiceError;
