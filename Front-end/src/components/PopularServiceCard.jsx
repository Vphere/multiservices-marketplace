import React from 'react'
import { Link } from 'react-router-dom'
import './PopularServiceCard.css'

const PopularServiceCard = ({ service }) => {
  return (
    <Link to={`/services/${service.category}`} className="popular-service-card">
      <div className="service-icon-wrapper" style={{ backgroundColor: `${service.color}15` }}>
        <span className="service-icon">{service.icon}</span>
      </div>
      <div className="service-info">
        <h3 className="service-name">{service.name}</h3>
        <p className="service-desc">{service.description}</p>
        <div className="service-meta">
          <span className="service-rating">⭐ {service.rating}</span>
          <span className="service-count">{service.providers}+ Providers</span>
        </div>
      </div>
      <div className="service-arrow">→</div>
    </Link>
  )
}

export default PopularServiceCard

