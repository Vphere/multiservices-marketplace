import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../auth/AuthProvider'
import Logo from './Logo'
import { getUsername } from '../utils/apiFunction'

const Navbar = () => {
  const role = sessionStorage.getItem("userRole");
  const email = sessionStorage.getItem("email");
  const auth = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const fetchUsername = async () => {
      if (sessionStorage.getItem("token")) {
        const name = sessionStorage.getItem("userId");
        if (name) {
          setUsername(name);
        }
      }
    };
    fetchUsername();
  }, []);

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
        <Logo />
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Urban Nexus Services</span>
        </Link>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/services/home-services" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Home Services</Link>
          <Link to="/services/beauty" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Beauty</Link>
          <Link to="/services/fitness" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Fitness</Link>
          <Link to="/services/arts-recreation" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Arts & Recreation</Link>
          <Link to="/user/order" className="navbar-link" onClick={() => setIsMenuOpen(false)}>🛒Order</Link>

          {role && role.includes("ROLE_ADMIN") &&
            <Link to="/admin/request" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Admin</Link>
          }

          {role && role.includes("ROLE_SERVICE") &&
            <Link to="/services/editService" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Service</Link>
          }
        </div>

        <div className="navbar-actions">
          {sessionStorage.getItem("token") === null ? (
            <div>
              <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
              <button className="btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
          ) : (
            <div style={{ position: "relative" }}>

              <span
                style={{ fontSize: "22px", cursor: "pointer" }}
                onClick={() => setShowProfile(!showProfile)}
              >
                👤
              </span>

              {showProfile && (
                <div style={{
                  position: "absolute",
                  right: 0,
                  top: "35px",
                  background: "#fff",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  minWidth: "220px",
                  zIndex: 1000
                }}>
                  <p><b>Email:</b> {username}</p>
                  <hr />
                  <button 
                    className="btn-signup" 
                    onClick={handleLogout}
                    style={{ width: "100%" }}
                  >
                    Log out
                  </button>
                </div>
              )}

            </div>
          )}
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
