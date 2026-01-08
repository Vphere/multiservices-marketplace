import React from 'react'
import { Link } from 'react-router-dom'
import './ServiceCategory.css'

const ServiceCategory = ({ category }) => {
  return (
    <Link to={`/services/${category.id}`} className="service-category-card">
      <div className="category-icon" style={{ backgroundColor: `${category.color}20` }}>
        <span style={{ fontSize: '3rem' }}>{category.icon}</span>
      </div>
      <div className="category-content">
        <h3 className="category-title">{category.title}</h3>
        <p className="category-description">{category.description}</p>
        <div className="category-services">
          {category.services.slice(0, 3).map((service, idx) => (
            <span key={idx} className="service-tag">{service}</span>
          ))}
          {category.services.length > 3 && (
            <span className="service-tag">+{category.services.length - 3} more</span>
          )}
        </div>
      </div>
      <div className="category-arrow">→</div>
    </Link>
  )
}

export default ServiceCategory

