import React, { useState } from 'react';
import './Logo.css';

const Logo = () => {
  const [showEnlargedLogo, setShowEnlargedLogo] = useState(false);

  const handleLogoClick = () => {
    setShowEnlargedLogo(true);
  };

  const handleCloseEnlarged = () => {
    setShowEnlargedLogo(false);
  };

  return (
    <>
      <div className="logo-container">
        <div className="navbar-logo-circle" onClick={handleLogoClick}>
          <img 
            src="/Gemini_Generated_Image_nnva12nnva12nnva.png" 
            alt="Urban Nexus Services" 
            className="navbar-logo-image"
          />
        </div>
      </div>

      {showEnlargedLogo && (
        <div className="enlarged-logo-overlay" onClick={handleCloseEnlargedLogo}>
          <div className="enlarged-logo-container">
            <img 
              src="/Gemini_Generated_Image_nnva12nnva12nnva.png" 
              alt="Urban Nexus Services" 
              className="enlarged-logo-image"
            />
            <button className="close-logo-btn" onClick={handleCloseEnlargedLogo}>×</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Logo;
