import React, { useState } from "react";
import { getEnabled, loginUser, userCheck } from "../utils/apiFunction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "./Login.css";

const Login = () => {

  const [errorMessage, setErrorMessage] = useState("");
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

    try {
      const success = await loginUser(login);

      if (!success) {
        setErrorMessage("Invalid email or password");
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

    setTimeout(() => setErrorMessage(""), 4000);
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="login-title">Welcome Back 👋</h1>
        <p className="login-subtitle">Login to continue</p>

        {errorMessage && (
          <div className="error-box">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <span>📧</span>
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={login.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={login.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="forgot">
            <span onClick={() => navigate("/EmailToResetPassword")}>
              Forgot password?
            </span>
          </div>

          <button className="login-btn">
            Login
          </button>

          <p className="signup-text">
            Don't have an account?
            <Link to="/signup"> Register</Link>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;