import React from 'react'
import { Link } from 'react-router-dom'
import './PopularServiceCard.css'

const PopularServiceCard = ({ service }) => {
  return (
    <Link to={`/services/${service.category}`} className="popular-service-card">
      <div className="service-image-wrapper">
        <img 
          src={service.image} 
          alt={service.name}
          className="service-image"
          onError={(e) => {
            // Fallback to gradient background if image fails to load
            e.target.style.display = 'none'
            const fallback = e.target.parentElement.querySelector('.service-image-fallback')
            if (fallback) {
              fallback.style.display = 'flex'
            }
          }}
        />
        <div 
          className="service-image-fallback"
          style={{ 
            backgroundColor: `${service.color}20`,
            display: 'none'
          }}
        >
          <span className="service-icon">{service.icon}</span>
        </div>
        {service.price && (
          <div className="service-price-badge">
            {service.price}
          </div>
        )}
      </div>
      <div className="service-content">
        <h3 className="service-name">{service.name}</h3>
        <div className="service-meta">
          <div className="service-rating-wrapper">
            <span className="service-rating-star">⭐</span>
            <span className="service-rating">{service.rating}</span>
            <span className="service-review-count">({service.reviews || Math.floor(service.providers * 2.5)})</span>
          </div>
          {service.price && (
            <span className="service-price-text">{service.price}</span>
          )}
        </div>
        {service.description && (
          <p className="service-desc">{service.description}</p>
        )}
      </div>
    </Link>
  )
}

export default PopularServiceCard

