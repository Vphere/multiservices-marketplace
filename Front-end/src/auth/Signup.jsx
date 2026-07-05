import React, { useState } from "react";
import { registerUser } from "../utils/apiFunction";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [registration, setRegistration] = useState({
    username: "",
    email: "",
    password: "",
    roles: []
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({
      ...registration,
      [e.target.name]: e.target.value
    });
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

    setLoading(true);

    try {

      await registerUser(registration);

      setSuccessMessage("Registration successful!");

      navigate("/verify", {
        state: { email: registration.email }
      });

      setRegistration({
        username: "",
        email: "",
        password: "",
        roles: []
      });

      setErrorMessage("");

    } catch (error) {

      setSuccessMessage("");
      setErrorMessage(`Registration error: ${error.message}`);

    }

    setLoading(false);

    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 4000);

  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">
          Join and start booking services
        </p>

        {errorMessage && (
          <div className="error-box">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="success-box">{successMessage}</div>
        )}

        <form onSubmit={handleRegistration} className="signup-form">

          <div className="input-group">
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              value={registration.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={registration.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create password"
              value={registration.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="role-box">

            <p className="role-title">
              Do you want to provide services?
            </p>

            <label className="role-option">

              <input
                type="checkbox"
                value="ROLE_SERVICE"
                checked={registration.roles.includes("ROLE_SERVICE")}
                onChange={handleRoleChange}
              />

              <span>Service Provider</span>

            </label>

          </div>

          <button
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
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