import React from 'react'
import './TestimonialCard.css'

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-avatar">
          <span>{testimonial.avatar}</span>
        </div>
        <div className="testimonial-info">
          <h4 className="testimonial-name">{testimonial.name}</h4>
          <p className="testimonial-location">{testimonial.location}</p>
        </div>
        <div className="testimonial-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < testimonial.rating ? 'star filled' : 'star'}>⭐</span>
          ))}
        </div>
      </div>
      <p className="testimonial-text">"{testimonial.text}"</p>
      <div className="testimonial-service">
        <span className="service-badge">{testimonial.service}</span>
      </div>
    </div>
  )
}

export default TestimonialCard

