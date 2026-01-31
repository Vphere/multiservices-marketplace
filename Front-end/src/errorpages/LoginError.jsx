import React from "react";
import "./LoginError.css";

const LoginError = () => {
  return (
    <div className="login-error-container">
      <div className="login-error-card">
        <div className="icon">🔒</div>
        <h1>Login Required</h1>
        <p>
          You must be logged in to access this page.
          Please login and try again.
        </p>
        <button
          className="login-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default LoginError;
