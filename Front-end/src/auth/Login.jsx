import React, { useState } from "react";
import { getEnabled, loginUser, userCheck } from "../utils/apiFunction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "./Login.css";

const Login = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const success = await loginUser(login);

      if (!success) {
        setErrorMessage("Invalid email or password");
        setLoading(false);
        return;
      }

      const token = success.token;
      auth.handleLogin(token);

      const role = sessionStorage.getItem("userRole");

      if (role.includes("ROLE_SERVICE")) {

        const data = await userCheck();
        const isEnabled = await getEnabled();

        if (isEnabled) {
          navigate("/services/editService");
        }
        else if (data) {
          navigate("/PendingRequest");
        }
        else {
          navigate("/serviceProviderForm");
        }

      } else {
        navigate(redirectUrl, { replace: true });
      }

    } catch (err) {
      setErrorMessage("Login failed. Try again.");
    }

    setLoading(false);
    setTimeout(() => setErrorMessage(""), 4000);
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to your account</p>

        {errorMessage && (
          <div className="error-box">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="login-form">

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={login.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={login.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="forgot">
            <span onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </span>
          </div>

          <button
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-text">
            Don't have an account?
            <Link to="/signup"> Create Account</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;