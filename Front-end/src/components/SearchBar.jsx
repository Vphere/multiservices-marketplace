import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

const SearchBar = ({ placeholder = "What service are you looking for?" }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // All available services mapped to categories
  const serviceMap = {
    'gym trainer': 'arts-recreation',
    'gym': 'arts-recreation',
    'trainer': 'arts-recreation',
    'dance': 'arts-recreation',
    'dance instructor': 'arts-recreation',
    'music': 'arts-recreation',
    'music teacher': 'arts-recreation',
    'art classes': 'arts-recreation',
    'art': 'arts-recreation',
    'sports coach': 'arts-recreation',
    'sports': 'arts-recreation',
    'yoga': 'arts-recreation',
    'meditation': 'arts-recreation',
    'personal trainer': 'fitness',
    'fitness': 'fitness',
    'pilates': 'fitness',
    'nutrition': 'fitness',
    'physiotherapy': 'fitness',
    'haircut': 'beauty',
    'hair': 'beauty',
    'salon': 'beauty',
    'facial': 'beauty',
    'massage': 'beauty',
    'spa': 'beauty',
    'manicure': 'beauty',
    'pedicure': 'beauty',
    'beauty': 'beauty',
    'plumbing': 'home-services',
    'plumber': 'home-services',
    'electrical': 'home-services',
    'electrician': 'home-services',
    'cleaning': 'home-services',
    'carpentry': 'home-services',
    'carpenter': 'home-services',
    'painting': 'home-services',
    'painter': 'home-services',
    'home': 'home-services',
  }

  const allServices = Object.keys(serviceMap)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase().trim()
    setSearchQuery(e.target.value)

    if (value.length > 0) {
      const filtered = allServices.filter(service =>
        service.includes(value) || value.includes(service)
      ).slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSearch = (query = searchQuery) => {
    const normalizedQuery = query.toLowerCase().trim()
    
    if (!normalizedQuery) return

    // Find matching category
    const category = serviceMap[normalizedQuery]
    
    if (category) {
      navigate(`/services/${category}`)
      setSearchQuery('')
      setShowSuggestions(false)
    } else {
      // Try partial match
      const matchedService = allServices.find(service => 
        service.includes(normalizedQuery) || normalizedQuery.includes(service)
      )
      
      if (matchedService) {
        navigate(`/services/${serviceMap[matchedService]}`)
        setSearchQuery('')
        setShowSuggestions(false)
      } else {
        // Default to arts-recreation if no match
        navigate('/services/arts-recreation')
        setSearchQuery('')
        setShowSuggestions(false)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion)
  }

  return (
    <div className="search-bar-container" ref={searchRef}>
      <div className="search-wrapper">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          onFocus={() => searchQuery && setShowSuggestions(true)}
        />
        <button className="search-btn" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-icon">🔍</span>
              <span className="suggestion-text">{suggestion}</span>
              <span className="suggestion-category">
                {serviceMap[suggestion]?.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar

