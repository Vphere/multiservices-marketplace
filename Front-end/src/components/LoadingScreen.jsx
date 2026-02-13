import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowLoading, setShouldShowLoading] = useState(false);

  useEffect(() => {
    // Check if this is the first visit in current session
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
      // First visit in this session - show loading screen
      setShouldShowLoading(true);
      sessionStorage.setItem('hasVisitedBefore', 'true');
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    } else {
      // Returning user in same session - don't show loading screen
      setIsLoading(false);
    }
  }, []);

  if (!isLoading || !shouldShowLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-animation">
          <div className="logo-circle">
            <img 
              src="/Gemini_Generated_Image_nnva12nnva12nnva.png" 
              alt="Urban Nexus Services" 
              className="logo-image"
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
