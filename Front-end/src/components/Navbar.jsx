import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        </div>

        <div className="navbar-actions">
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
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

