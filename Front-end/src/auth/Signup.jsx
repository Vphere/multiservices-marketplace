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
      registration.roles.includes("ROLE_USER")
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
    <div className="signup-page">
      <div className="signup-overlay d-flex justify-content-center align-items-center">
        <div className="card shadow-lg p-4 signup-card">
          <h2 className="text-center mb-4 fw-bold">Create Account</h2>

          {errorMessage && (
            <div className="alert alert-danger text-center">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleRegistration}>
            {/* Username */}
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                name="username"
                type="text"
                className="form-control"
                value={registration.username}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={registration.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={registration.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Roles */}
            <div className="mb-3">
              <label className="form-label fw-bold">Do You Want to Provide Service?</label>

              {/* <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="ROLE_USER"
                  checked={registration.roles.includes("ROLE_USER")}
                  onChange={handleRoleChange}
                />
                <label className="form-check-label">User</label>
              </div> */}

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="ROLE_SERVICE"
                  checked={registration.roles.includes("ROLE_SERVICE")}
                  onChange={handleRoleChange}
                />
                <label className="form-check-label">Service Provider</label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Register
            </button>

            <p className="text-center mb-0">
              Already have an account?
              <Link to="/login" className="ms-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
