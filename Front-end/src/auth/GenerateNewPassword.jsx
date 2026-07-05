import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpforPassword } from "../utils/apiFunction";
import "./Verify.css"; // reuse your existing styles

const GenerateNewPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      await sendOtpforPassword(email);

      setMsg("OTP sent successfully 📩");
      setError("");

      setTimeout(() => {
        navigate("/verify-reset", { state: { email } });
      }, 1000);

    } catch (e) {
      setError("Failed to send OTP ❌");
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-overlay">
        <div className="verify-card">
          <h2 className="verify-title">Forgot Password</h2>

          <p className="verify-subtitle">
            Enter your registered email to receive OTP
          </p>

          {/* ✅ Bigger Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="big-input"
          />

          {error && <div className="alert-error">{error}</div>}
          {msg && <div className="alert-success">{msg}</div>}

          <button className="verify-btn" onClick={handleSendOtp}>
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateNewPassword;