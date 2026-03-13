import React from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-animation">
          <div className="logo-circle">
            <img src="/Gemini_Generated_Image_nnva12nnva12nnva.png"
              alt="Urban Nexus Services" className="logo-image"
            />
          </div>
        </div>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
