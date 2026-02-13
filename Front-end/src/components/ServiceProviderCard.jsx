import React from "react"
import { useNavigate } from "react-router-dom"
import "./ServiceProviderCard.css"

// const list = [];

const ServiceProviderCard = ({ provider }) => {
  const navigate = useNavigate()
  // list.push(provider);
  const handleBookNow = (e) => {
    // console.log(e.target.value)
    // list.filter(l => (
    //   e.target.value === l.email ? 
    // ))
    navigate("/book-slot", {
      state: { provider }
    })
  }

  return (
    <div className="provider-card">

      {/* Header */}
      <div className="provider-header">
        <div className="provider-avatar">
          <span className="avatar-icon">🔧</span>
        </div>

        <div className="provider-info">
          <h3 className="provider-name">{provider.name}</h3>
          <p className="provider-profession">{provider.profession}</p>
        </div>
      </div>

      {/* Details */}
      <div className="provider-details">
        <div className="detail-row">
          <span>Experience</span>
          <strong>{provider.years} years</strong>
        </div>

        <div className="detail-row">
          <span>Location</span>
          <strong>{provider.city}</strong>
        </div>

        <div className="detail-row">
          <span>Price</span>
          <strong className="price">₹{provider.price}/service</strong>
        </div>
      </div>

      {/* Services */}
      <div className="provider-specialties">
        {provider.servicelist?.map((service, index) => (
          <span key={index} className="specialty-tag">
            {service}
          </span>
        ))}
      </div>

      {/* Action */}
      <button value={provider.email} className="book-btn" onClick={handleBookNow}>
        Book Now
      </button>

    </div>
  )
}

export default ServiceProviderCard
