import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { changePassword } from "../utils/apiFunction";
import "./Verify.css";

const SetNewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    try {
      await changePassword(email, password);

      setMsg("Password changed successfully ✅");
      setError("");

      setTimeout(() => navigate("/login"), 1500);

    } catch {
      setError("Failed to change password ❌");
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-overlay">
        <div className="verify-card">
          <h2 className="verify-title">Set New Password</h2>

          <p className="verify-subtitle">
            Create a strong password for your account
          </p>

          {/* ✅ Bigger Password Input */}
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="big-input"
          />

          {/* ✅ Confirm Password */}
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="big-input"
          />

          {error && <div className="alert-error">{error}</div>}
          {msg && <div className="alert-success">{msg}</div>}

          <button className="verify-btn" onClick={handleChangePassword}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;