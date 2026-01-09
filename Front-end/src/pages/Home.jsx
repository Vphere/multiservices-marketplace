import React from 'react'
import { Link } from 'react-router-dom'
import ServiceCategory from '../components/ServiceCategory'
import Hero from '../components/Hero'
import PopularServiceCard from '../components/PopularServiceCard'
import FeaturedProviderCard from '../components/FeaturedProviderCard'
import TestimonialCard from '../components/TestimonialCard'
import './Home.css'

const Home = () => {
  const serviceCategories = [
    {
      id: 'home-services',
      title: 'Home Services',
      icon: '🏡',
      description: 'Plumbing, Electrical, Cleaning & More',
      color: '#14b8a6',
      services: ['Plumbing', 'Electrical', 'Cleaning', 'Carpentry', 'Painting']
    },
    {
      id: 'beauty',
      title: 'Beauty & Wellness',
      icon: '💅',
      description: 'Salon, Spa, Massage & Skincare',
      color: '#ec4899',
      services: ['Haircut', 'Facial', 'Massage', 'Manicure', 'Pedicure']
    },
    {
      id: 'fitness',
      title: 'Fitness & Health',
      icon: '💪',
      description: 'Personal Trainers & Nutritionists',
      color: '#10b981',
      services: ['Personal Training', 'Yoga', 'Pilates', 'Nutrition', 'Physiotherapy']
    },
    {
      id: 'arts-recreation',
      title: 'Arts & Recreation',
      icon: '🎨',
      description: 'Gym Trainers, Dance, Music & More',
      color: '#06b6d4',
      services: ['Gym Trainer', 'Dance Instructor', 'Music Teacher', 'Art Classes', 'Sports Coaching']
    }
  ]

  const popularServices = [
    {
      name: 'Haircut & Styling',
      description: 'Professional haircut and styling services',
      icon: '💇',
      color: '#ec4899',
      rating: 4.9,
      providers: 150,
      category: 'beauty'
    },
    {
      name: 'Home Cleaning',
      description: 'Deep cleaning and maintenance',
      icon: '🧹',
      color: '#14b8a6',
      rating: 4.8,
      providers: 200,
      category: 'home-services'
    },
    {
      name: 'Personal Training',
      description: 'One-on-one fitness training',
      icon: '💪',
      color: '#10b981',
      rating: 4.9,
      providers: 120,
      category: 'fitness'
    },
    {
      name: 'Gym Trainer',
      description: 'Professional gym training sessions',
      icon: '🏋️',
      color: '#06b6d4',
      rating: 4.8,
      providers: 180,
      category: 'arts-recreation'
    },
    {
      name: 'Plumbing Services',
      description: 'Expert plumbing solutions',
      icon: '🔧',
      color: '#14b8a6',
      rating: 4.7,
      providers: 95,
      category: 'home-services'
    },
    {
      name: 'Facial & Skincare',
      description: 'Rejuvenating facial treatments',
      icon: '✨',
      color: '#ec4899',
      rating: 4.9,
      providers: 110,
      category: 'beauty'
    }
  ]

  const featuredProviders = [
    {
      name: 'Rajesh Kumar',
      service: 'Gym Trainer',
      image: '💪',
      rating: 4.9,
      reviews: 234,
      experience: '5 years',
      price: '₹800/session',
      category: 'arts-recreation'
    },
    {
      name: 'Priya Sharma',
      service: 'Hair Stylist',
      image: '💇',
      rating: 4.9,
      reviews: 567,
      experience: '12 years',
      price: '₹1200/service',
      category: 'beauty'
    },
    {
      name: 'Amit Singh',
      service: 'Personal Trainer',
      image: '🏋️',
      rating: 4.8,
      reviews: 456,
      experience: '8 years',
      price: '₹1000/session',
      category: 'fitness'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Mumbai',
      avatar: '👩',
      rating: 5,
      text: 'Amazing service! The trainer was professional and helped me achieve my fitness goals. Highly recommended!',
      service: 'Personal Training'
    },
    {
      name: 'Rahul Mehta',
      location: 'Delhi',
      avatar: '👨',
      rating: 5,
      text: 'Best haircut I\'ve ever had! The stylist understood exactly what I wanted and delivered perfectly.',
      service: 'Haircut & Styling'
    },
    {
      name: 'Priya Patel',
      location: 'Bangalore',
      avatar: '👩',
      rating: 5,
      text: 'The home cleaning service was thorough and efficient. My house has never been cleaner!',
      service: 'Home Cleaning'
    },
    {
      name: 'Vikram Singh',
      location: 'Pune',
      avatar: '👨',
      rating: 5,
      text: 'Excellent gym trainer! Very knowledgeable and motivating. I\'ve seen great results in just 2 months.',
      service: 'Gym Trainer'
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <Hero />

      {/* Service Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {serviceCategories.map(category => (
              <ServiceCategory key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="popular-services-section">
        <div className="container">
          <h2 className="section-title">Popular Services</h2>
          <div className="popular-services-grid">
            {popularServices.map((service, idx) => (
              <PopularServiceCard key={idx} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers Section */}
      <section className="featured-providers-section">
        <div className="container">
          <h2 className="section-title">Featured Providers</h2>
          <div className="featured-providers-grid">
            {featuredProviders.map((provider, idx) => (
              <FeaturedProviderCard key={idx} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h3>Search & Select</h3>
              <p>Browse through our verified service providers and select the one that fits your needs</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">📅</div>
              <h3>Book Appointment</h3>
              <p>Choose your preferred date and time slot for the service</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">✅</div>
              <h3>Get Service</h3>
              <p>Our professional arrives at your doorstep and delivers quality service</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-icon">⭐</div>
              <h3>Rate & Review</h3>
              <p>Share your experience and help others make informed decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Verified Professionals</h3>
              <p>All service providers are background verified and trained</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden charges, clear pricing for all services</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>100% Satisfaction</h3>
              <p>Money-back guarantee if you're not satisfied</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Quick Booking</h3>
              <p>Book services in minutes, available 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

