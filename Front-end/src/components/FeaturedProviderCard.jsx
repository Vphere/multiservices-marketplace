import React from 'react'
import { Link } from 'react-router-dom'
import './FeaturedProviderCard.css'

const FeaturedProviderCard = ({ provider }) => {
  return (
    <Link to={`/services/${provider.category}`} className="featured-provider-card">
      <div className="provider-badge">⭐ Featured</div>
      <div className="provider-avatar-large">
        <span>{provider.image}</span>
      </div>
      <div className="provider-details">
        <h3 className="provider-name">{provider.name}</h3>
        <p className="provider-service">{provider.service}</p>
        <div className="provider-stats">
          <div className="stat-item">
            <span className="stat-value">{provider.rating}</span>
            <span className="stat-label">Rating</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{provider.reviews}+</span>
            <span className="stat-label">Reviews</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">{provider.experience}</span>
            <span className="stat-label">Experience</span>
          </div>
        </div>
        <div className="provider-price">
          Starting at <span className="price-amount">{provider.price}</span>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedProviderCard

