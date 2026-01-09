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
            <div className={`${styles.floatingIcon} ${styles.icon6}`}>🧘</div>
            
            {/* Connecting Lines */}
            <svg className={styles.connectingLines} viewBox="0 0 400 300" preserveAspectRatio="none">
              <line className={`${styles.connectionLine} ${styles.line1}`} x1="80" y1="60" x2="320" y2="80" />
              <line className={`${styles.connectionLine} ${styles.line2}`} x1="320" y2="80" x2="40" y2="150" />
              <line className={`${styles.connectionLine} ${styles.line3}`} x1="40" y2="150" x2="360" y2="180" />
              <line className={`${styles.connectionLine} ${styles.line4}`} x1="360" y2="180" x2="120" y2="240" />
              <line className={`${styles.connectionLine} ${styles.line5}`} x1="120" y2="240" x2="280" y2="260" />
              <line className={`${styles.connectionLine} ${styles.line6}`} x1="280" y2="260" x2="80" y2="60" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

