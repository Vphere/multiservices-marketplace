import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import styles from './Hero.module.css'

const Hero = () => {
  const [selectedLocation, setSelectedLocation] = useState('Mumbai')
  const navigate = useNavigate()

  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata']

  const popularSearches = [
    { label: 'Salon', category: 'beauty' },
    { label: 'Yoga', category: 'arts-recreation' },
    { label: 'Gym Trainer', category: 'arts-recreation' }
  ]

  const handlePopularSearch = (category) => {
    navigate(`/services/${category}`)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Professional Services
          <span className={styles.highlight}> At Your Doorstep</span>
        </h1>
        <p className={styles.heroSubtitle}>
          From home repairs to fitness training, from beauty services to arts & recreation - 
          we connect you with verified professionals
        </p>
        
        <div className={styles.searchContainer}>
          <div className={styles.locationSelector}>
            <span className={styles.locationIcon}>📍</span>
            <select 
              className={styles.locationDropdown}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className={styles.searchBarWrapper}>
            <SearchBar />
          </div>
        </div>

        <div className={styles.popularSearches}>
          <span className={styles.popularLabel}>Popular:</span>
          {popularSearches.map((search, index) => (
            <button
              key={index}
              className={styles.searchChip}
              onClick={() => handlePopularSearch(search.category)}
            >
              {search.label}
            </button>
          ))}
        </div>

        <button 
          className={styles.ctaButton}
          onClick={() => navigate('/services/arts-recreation')}
        >
          Explore Services
        </button>
      </div>
      
      <div className={styles.heroImage}>
        <div className={styles.heroImageContainer}>
          <div className={styles.heroIcons}>
            <div className={`${styles.floatingIcon} ${styles.icon1}`}>🏠</div>
            <div className={`${styles.floatingIcon} ${styles.icon2}`}>💅</div>
            <div className={`${styles.floatingIcon} ${styles.icon3}`}>💪</div>
            <div className={`${styles.floatingIcon} ${styles.icon4}`}>🎨</div>
            <div className={`${styles.floatingIcon} ${styles.icon5}`}>🔧</div>
            
            {/* Connecting Lines */}
            <svg className={styles.connectingLines} viewBox="0 0 400 300" preserveAspectRatio="none">
              <line className={`${styles.connectionLine} ${styles.line1}`} x1="100" y1="60" x2="360" y2="80" />
              <line className={`${styles.connectionLine} ${styles.line2}`} x1="360" y1="80" x2="400" y2="150" />
              <line className={`${styles.connectionLine} ${styles.line3}`} x1="40" y1="110" x2="360" y2="130" />
              <line className={`${styles.connectionLine} ${styles.line4}`} x1="300" y1="200" x2="140" y2="220" />
              <line className={`${styles.connectionLine} ${styles.line5}`} x1="160" y1="240" x2="290" y2="260" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

