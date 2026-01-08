import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './BookingModal.css'

const BookingModal = ({ isOpen, onClose, provider }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [error, setError] = useState('')

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]
  
  // Generate time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', 
    '17:00', '18:00', '19:00', '20:00'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time to proceed')
      return
    }

    setIsBooking(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false)
      setIsBooked(true)
      setTimeout(() => {
        onClose()
        setIsBooked(false)
        setSelectedDate('')
        setSelectedTime('')
      }, 2000)
    }, 1500)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div className="booking-modal-overlay" onClick={handleBackdropClick}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="provider-preview">
            <div className="preview-avatar">
              <span>{provider?.image}</span>
            </div>
            <div className="preview-info">
              <h2>Book Service</h2>
              <p className="preview-name">{provider?.name}</p>
              <p className="preview-service">{provider?.service}</p>
            </div>
          </div>
        </div>

        {!isBooked ? (
          <form className="booking-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="date">
                <span className="label-icon">📅</span>
                Select Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                required
                className="date-input"
              />
              {selectedDate && (
                <p className="date-preview">
                  Selected: {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time">
                <span className="label-icon">⏰</span>
                Select Time
              </label>
              <div className="time-slots">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="booking-summary">
              <div className="summary-item">
                <span>Service:</span>
                <span>{provider?.service}</span>
              </div>
              <div className="summary-item">
                <span>Price:</span>
                <span className="summary-price">{provider?.price}</span>
              </div>
              {selectedDate && selectedTime && (
                <div className="summary-item highlight">
                  <span>Date & Time:</span>
                  <span>
                    {new Date(selectedDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })} at {selectedTime}
                  </span>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-confirm"
                disabled={!selectedDate || !selectedTime || isBooking}
              >
                {isBooking ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        ) : (
          <div className="booking-success">
            <div className="success-icon">✓</div>
            <h3>Booking Confirmed!</h3>
            <p>Your service has been successfully booked.</p>
            <div className="success-details">
              <p><strong>Service:</strong> {provider?.service}</p>
              <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export default BookingModal

