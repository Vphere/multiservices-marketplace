import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ServiceProviderCard from '../components/ServiceProviderCard'
import './ServiceListing.css'

const ServiceListing = () => {
  const { category } = useParams()
  const [sortBy, setSortBy] = useState('rating')

  // Mock data for service providers
  const getServiceProviders = (category) => {
    const providers = {
      'arts-recreation': [
        {
          id: 1,
          name: 'Rajesh Kumar',
          service: 'Gym Trainer',
          rating: 4.9,
          reviews: 234,
          experience: '5 years',
          price: '₹800/session',
          image: '💪',
          specialties: ['Weight Training', 'Cardio', 'Nutrition'],
          location: 'Delhi'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          service: 'Dance Instructor',
          rating: 4.8,
          reviews: 189,
          experience: '7 years',
          price: '₹600/session',
          image: '💃',
          specialties: ['Bollywood', 'Hip-Hop', 'Contemporary'],
          location: 'Mumbai'
        },
        {
          id: 3,
          name: 'Amit Singh',
          service: 'Music Teacher',
          rating: 4.9,
          reviews: 156,
          experience: '10 years',
          price: '₹700/session',
          image: '🎸',
          specialties: ['Guitar', 'Piano', 'Vocals'],
          location: 'Bangalore'
        },
        {
          id: 4,
          name: 'Sneha Patel',
          service: 'Art Classes',
          rating: 4.7,
          reviews: 98,
          experience: '6 years',
          price: '₹500/session',
          image: '🎨',
          specialties: ['Painting', 'Sketching', 'Digital Art'],
          location: 'Pune'
        },
        {
          id: 5,
          name: 'Vikram Mehta',
          service: 'Sports Coach',
          rating: 4.8,
          reviews: 201,
          experience: '8 years',
          price: '₹900/session',
          image: '⚽',
          specialties: ['Cricket', 'Football', 'Tennis'],
          location: 'Chennai'
        },
        {
          id: 6,
          name: 'Ananya Reddy',
          service: 'Yoga & Meditation',
          rating: 4.9,
          reviews: 312,
          experience: '12 years',
          price: '₹550/session',
          image: '🧘',
          specialties: ['Hatha Yoga', 'Vinyasa', 'Meditation'],
          location: 'Hyderabad'
        }
      ],
      'fitness': [
        {
          id: 1,
          name: 'John Doe',
          service: 'Personal Trainer',
          rating: 4.9,
          reviews: 456,
          experience: '8 years',
          price: '₹1000/session',
          image: '💪',
          specialties: ['Weight Loss', 'Muscle Building', 'HIIT'],
          location: 'Delhi'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          service: 'Yoga Instructor',
          rating: 4.8,
          reviews: 389,
          experience: '10 years',
          price: '₹800/session',
          image: '🧘',
          specialties: ['Ashtanga', 'Power Yoga', 'Yin Yoga'],
          location: 'Mumbai'
        }
      ],
      'beauty': [
        {
          id: 1,
          name: 'Meera Kapoor',
          service: 'Hair Stylist',
          rating: 4.9,
          reviews: 567,
          experience: '12 years',
          price: '₹1200/service',
          image: '💇',
          specialties: ['Haircut', 'Coloring', 'Hair Spa'],
          location: 'Delhi'
        }
      ],
      'home-services': [
        {
          id: 1,
          name: 'Ramesh Plumbing',
          service: 'Plumber',
          rating: 4.7,
          reviews: 423,
          experience: '15 years',
          price: '₹500/service',
          image: '🔧',
          specialties: ['Plumbing', 'Leak Repair', 'Installation'],
          location: 'Delhi'
        }
      ]
    }

    return providers[category] || providers['arts-recreation']
  }

  const providers = getServiceProviders(category)
  const categoryNames = {
    'arts-recreation': 'Arts & Recreation',
    'fitness': 'Fitness & Health',
    'beauty': 'Beauty & Wellness',
    'home-services': 'Home Services'
  }

  const sortedProviders = [...providers].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'reviews') return b.reviews - a.reviews
    if (sortBy === 'price-low') return parseInt(a.price) - parseInt(b.price)
    if (sortBy === 'price-high') return parseInt(b.price) - parseInt(a.price)
    return 0
  })

  return (
    <div className="service-listing">
      <div className="container">
        <div className="listing-header">
          <h1 className="listing-title">{categoryNames[category] || 'Services'}</h1>
          <p className="listing-subtitle">
            Choose from {providers.length} verified professionals
          </p>
        </div>

        <div className="listing-controls">
          <div className="filter-section">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="providers-grid">
          {sortedProviders.map(provider => (
            <ServiceProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceListing

