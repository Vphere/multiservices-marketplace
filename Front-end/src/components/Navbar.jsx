import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import Logout from '../auth/Logout'
import { AuthContext, useAuth } from '../auth/AuthProvider'

const Navbar = () => {
  const role = localStorage.getItem("userRole");
  const auth = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    auth.handleLogout();
    navigate("/", { state: { message: "You have been logged out!" } });
  }
};

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">UrbanServices</span>
        </Link>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/services/home-services" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home Services
          </Link>
          <Link to="/services/beauty" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Beauty
          </Link>
          <Link to="/services/fitness" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Fitness
          </Link>
          <Link to="/services/arts-recreation" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Arts & Recreation
          </Link>
          {
            role && role.includes("ROLE_ADMIN") && <Link to="/admin/request" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Admin
          </Link>
          }
          {
            role && role.includes("ROLE_SERVICE") && <Link to="/services/editService" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              Service
          </Link>
          }

        </div>

        <div className="navbar-actions">
          {localStorage.getItem("token")===null ? (<div>
            <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
          </div>):<button className="btn-signup" onClick={handleLogout}>Log out</button>
          }   
        </div>

        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar