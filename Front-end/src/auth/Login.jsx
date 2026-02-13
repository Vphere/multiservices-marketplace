import React, { useState } from "react";
import { getEnabled, loginUser, userCheck } from "../utils/apiFunction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import ServiceProviderForm from "../ServiceProvider/ServiceProviderForm";
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
    const success = await loginUser(login);
    const token = success.token;
    console.log(token);
    auth.handleLogin(token);
    const role = sessionStorage.getItem("userRole");
    console.log(role);
    if(role.includes("ROLE_SERVICE")){
      const data = await userCheck();
      const isEnabled = await getEnabled();
      if(isEnabled){
        navigate("/services/editService");
      }
      else if(data){
        navigate("/PendingRequest");
        return;
      }
      else{
        navigate("/serviceProviderForm");
        return;
      }
    }
    else if (success) {
      const token = success.token;
      console.log(token);
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
  <div className="login-page">
    <div className="login-overlay d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4 login-card">
        <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={login.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={login.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="text-end mb-3">
            <span
              className="forgot-password-link"
              onClick={() => navigate("/EmailToResetPassword")}
            >
              Forgot password?
            </span>
          </div>

          <button className="btn btn-primary w-100 mb-3">
            Login
          </button>

          <p className="text-center mb-0">
            Don’t have an account?
            <Link to="/signup" className="ms-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
);
};

export default Login;