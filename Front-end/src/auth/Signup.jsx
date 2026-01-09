import React, { useState } from "react";
import { registerUser } from "../utils/apiFunction";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [registration, setRegistration] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await registerUser(registration);

      navigate("/verify", {
        state: { email: registration.email }
      });

      setErrorMessage("");
      setSuccessMessage("Registration successful!");
      setRegistration({ username: "", email: "", password: "" });
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
