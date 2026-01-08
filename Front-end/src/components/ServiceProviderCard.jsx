import React, { useState } from 'react'
import BookingModal from './BookingModal'
import './ServiceProviderCard.css'

const ServiceProviderCard = ({ provider }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="provider-card">
      <div className="provider-header">
        <div className="provider-avatar">
          <span className="avatar-icon">{provider.image}</span>
        </div>
        <div className="provider-info">
          <h3 className="provider-name">{provider.name}</h3>
          <p className="provider-service">{provider.service}</p>
          <div className="provider-rating">
            <span className="rating-stars">⭐ {provider.rating}</span>
            <span className="rating-reviews">({provider.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="provider-details">
        <div className="detail-item">
          <span className="detail-label">Experience:</span>
          <span className="detail-value">{provider.experience}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{provider.location}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Price:</span>
          <span className="detail-value price">{provider.price}</span>
        </div>
      </div>

      <div className="provider-specialties">
        {provider.specialties.map((specialty, idx) => (
          <span key={idx} className="specialty-tag">{specialty}</span>
        ))}
      </div>

      <button 
        className="book-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Book Now
      </button>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        provider={provider}
      />
    </div>
  )
}

export default ServiceProviderCard

