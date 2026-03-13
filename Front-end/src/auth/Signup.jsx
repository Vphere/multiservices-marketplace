import React, { useState } from "react";
import { registerUser } from "../utils/apiFunction";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [registration, setRegistration] = useState({
    username: "",
    email: "",
    password: "",
    roles: []
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;

    setRegistration((prev) => ({
      ...prev,
      roles: checked
        ? [...prev.roles, value]
        : prev.roles.filter((r) => r !== value)
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (registration.roles.length === 0) {
      setErrorMessage("Please select at least one role");
      return;
    }

    try {
      await registerUser(registration);

      navigate("/verify", {
        state: { email: registration.email }
      });

      setSuccessMessage("Registration successful!");
      setErrorMessage("");

      setRegistration({
        username: "",
        email: "",
        password: "",
        roles: []
      });

    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error: ${error.message}`);
    }

    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="signup-container">

      <div className="signup-card">

        <h1 className="signup-title">Create Account 🚀</h1>
        <p className="signup-subtitle">Join and start booking services</p>

        {errorMessage && (
          <div className="error-box">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="success-box">{successMessage}</div>
        )}

        <form onSubmit={handleRegistration}>

          <div className="input-group">
            <span>👤</span>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={registration.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <span>📧</span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={registration.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={registration.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="role-box">
            <p className="role-title">Do you want to provide services?</p>

            <label className="role-option">
              <input
                type="checkbox"
                value="ROLE_SERVICE"
                checked={registration.roles.includes("ROLE_SERVICE")}
                onChange={handleRoleChange}
              />
              <span>👨‍🔧 Service Provider</span>
            </label>

          </div>

          <button className="signup-btn">
            Register
          </button>

          <p className="login-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Signup;