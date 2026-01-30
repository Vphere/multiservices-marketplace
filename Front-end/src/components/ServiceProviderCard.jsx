import React, { useState } from "react"
import BookingModal from "./BookingModal"
import "./ServiceProviderCard.css"

const ServiceProviderCard = ({ provider }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="provider-card">
      <div className="provider-header">
        <div className="provider-avatar">
          <span className="avatar-icon">🔧</span>
        </div>

        <div className="provider-info">
          <h3 className="provider-name">{provider.name}</h3>
          <p className="provider-service">{provider.profession}</p>

          <div className="provider-rating">
            <span className="rating-stars">⭐ 4.7</span>
            <span className="rating-reviews">(423 reviews)</span>
          </div>
        </div>
      </div>

      <div className="provider-details">
        <div className="detail-item">
          <span className="detail-label">Experience:</span>
          <span className="detail-value">{provider.years} years</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{provider.city}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Price:</span>
          <span className="detail-value price">₹500/service</span>
        </div>
      </div>

      <div className="provider-specialties">
        {provider.servicelist?.map((service, index) => (
          <span key={index} className="specialty-tag">
            {service}
          </span>
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
