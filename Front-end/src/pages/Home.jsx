import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ServiceCategory from '../components/ServiceCategory'
import Hero from '../components/Hero'
import PopularServiceCard from '../components/PopularServiceCard'
import FeaturedProviderCard from '../components/FeaturedProviderCard'
import TestimonialCard from '../components/TestimonialCard'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
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
      category: 'beauty',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
      price: '₹299',
      reviews: 1250
    },
    {
      name: 'Home Cleaning',
      description: 'Deep cleaning and maintenance',
      icon: '🧹',
      color: '#14b8a6',
      rating: 4.8,
      providers: 200,
      category: 'home-services',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      price: '₹499',
      reviews: 2100
    },
    {
      name: 'Personal Training',
      description: 'One-on-one fitness training',
      icon: '💪',
      color: '#10b981',
      rating: 4.9,
      providers: 120,
      category: 'fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      price: '₹799',
      reviews: 890
    },
    {
      name: 'Gym Trainer',
      description: 'Professional gym training sessions',
      icon: '🏋️',
      color: '#06b6d4',
      rating: 4.8,
      providers: 180,
      category: 'arts-recreation',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      price: '₹699',
      reviews: 1450
    },
    {
      name: 'Plumbing Services',
      description: 'Expert plumbing solutions',
      icon: '🔧',
      color: '#14b8a6',
      rating: 4.7,
      providers: 95,
      category: 'home-services',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
      price: '₹399',
      reviews: 650
    },
    {
      name: 'Facial & Skincare',
      description: 'Rejuvenating facial treatments',
      icon: '✨',
      color: '#ec4899',
      rating: 4.9,
      providers: 110,
      category: 'beauty',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
      price: '₹599',
      reviews: 980
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
      {/* 
        SECTION 1: HERO
        Purpose: First impression and primary call-to-action
        Why first: Captures attention immediately, establishes brand presence, provides search/booking entry point
        Inspired by: Urban Company's hero section with search functionality
      */}
      <Hero />

      {/* 
        SECTION 2: CATEGORY GRID - "What are you looking for?"
        Purpose: Help users navigate by service category
        Why second: After hero, users need clear navigation paths. Categories help users who know what type of service they want
        Hierarchy: Placed early to reduce decision fatigue and provide quick category-based browsing
        Inspired by: Urban Company's category grid that appears right after hero
      */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">What are you looking for?</h2>
          <div className="categories-grid">
            {serviceCategories.map(category => (
              <ServiceCategory key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 
        SECTION 3: MOST BOOKED SERVICES
        Purpose: Showcase popular services to drive conversions
        Why third: After categories, users want to see what's popular. Social proof through booking numbers encourages action
        Hierarchy: Services are the core product, so they appear before providers to establish service-first approach
        Inspired by: Urban Company's "Most Booked" section that appears early in the page flow
      */}
      <section className="popular-services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Most Booked Services</h2>
            <button className="see-all-button" onClick={() => navigate('/services')}>
              See all →
            </button>
          </div>
          <div className="popular-services-scroll">
            <div className="popular-services-grid">
              {popularServices.map((service, idx) => (
                <PopularServiceCard key={idx} service={service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        SECTION 4: NEW & NOTEWORTHY (Featured Providers)
        Purpose: Highlight featured or new providers to create interest
        Why fourth: After showing services, introduce the people behind them. Featured providers add personal connection
        Hierarchy: Providers come after services because users typically search by service first, then select provider
        Inspired by: Urban Company's "New & Noteworthy" section that showcases featured professionals
      */}
      <section className="featured-providers-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New & Noteworthy</h2>
            <button className="see-all-button" onClick={() => navigate('/services')}>
              See all →
            </button>
          </div>
          <div className="featured-providers-scroll">
            <div className="featured-providers-grid">
              {featuredProviders.map((provider, idx) => (
                <FeaturedProviderCard key={idx} provider={provider} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        SECTION 5: HOW IT WORKS
        Purpose: Educate users about the booking process
        Why fifth: After showcasing products (services/providers), explain the process. Reduces friction for first-time users
        Hierarchy: Educational content appears after product showcase but before social proof
        Inspired by: Urban Company's process explanation that appears mid-page
      */}
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

      {/* 
        SECTION 6: TESTIMONIALS
        Purpose: Provide social proof through customer reviews
        Why sixth: After explaining the process, testimonials validate the experience. Builds trust before final CTA
        Hierarchy: Social proof appears after product/process but before trust features
        Inspired by: Urban Company's customer reviews section that reinforces trust
      */}
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

      {/* 
        SECTION 7: WHY CHOOSE US (Features)
        Purpose: Build final trust and address concerns before conversion
        Why last: Final reassurance before user decides to book. Addresses common concerns (verification, pricing, satisfaction)
        Hierarchy: Trust-building content appears at the end to reinforce decision-making
        Inspired by: Urban Company's trust indicators that appear near the bottom
      */}
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

