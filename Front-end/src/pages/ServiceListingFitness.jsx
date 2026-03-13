
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ServiceProviderCard from "../components/ServiceProviderCard"
import { getFitness } from "../utils/apiFunction"
import "./ServiceListing.css"

const fitnessProfessionList = [
  "Yoga Instructor",
  "Personal Fitness Trainer",
  "Gym Trainer",
  "Zumba Instructor",
  "Pilates Instructor",
  "Meditation Coach",
  "Weight Loss Coach"
]

const ServiceListingFitness = () => {

  const [providers, setProviders] = useState([])
  const [searchCity, setSearchCity] = useState("")
  const [searchProfessionText, setSearchProfessionText] = useState("")

  const [category, setCategory] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [categoryList, setCategoryList] = useState([])

  const [suggestions, setSuggestions] = useState([])

  const location = useLocation()

  useEffect(() => {
    if (location.state?.selectedService) {
      setSearchProfessionText(location.state.selectedService)
    }
  }, [location.state])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFitness()
      if (data) {
        setProviders(Array.isArray(data) ? data : [data])
      }
    }
    fetchData()
  }, [])

  const handleProfessionChange = (value) => {
    setSearchProfessionText(value)

    if (value.trim() === "") {
      setSuggestions([])
      return
    }

    const filtered = fitnessProfessionList.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    )

    setSuggestions(filtered)
  }

  const selectSuggestion = (item) => {
    setSearchProfessionText(item)
    setSuggestions([])
  }

  // CATEGORY CLICK
  const handleCategoryClick = (type) => {

    setCategory(type)
    setSelectedService("")

    const list = fitnessProfessionList.filter((item) =>
      item.toLowerCase().includes(type.toLowerCase())
    )

    setCategoryList(list)
  }

  // SUB SERVICE CLICK
  const handleServiceClick = (service) => {
    setSelectedService(service)
  }

  // FILTER LOGIC
  const filteredProviders = providers.filter((provider) => {

    const cityMatch = searchCity
      ? provider.city?.toLowerCase().includes(searchCity.toLowerCase())
      : true

    if (selectedService) {
      return (
        cityMatch &&
        provider.profession?.toLowerCase() === selectedService.toLowerCase()
      )
    }

    if (category) {
      return (
        cityMatch &&
        provider.profession?.toLowerCase().includes(category.toLowerCase())
      )
    }

    if (searchProfessionText) {
      return (
        cityMatch &&
        provider.profession
          ?.toLowerCase()
          .includes(searchProfessionText.toLowerCase())
      )
    }

    return cityMatch
  })

  return (
    <div className="service-listing">
      <div className="container">

        {/* Header */}
        <div className="listing-header">
          <h1 className="listing-title">Fitness</h1>
          <p className="listing-subtitle">
            Choose from {filteredProviders.length} verified professionals
          </p>
        </div>

        {/* Search */}
        <div className="search-wrapper">

          <div className="search-box">
            <input
              type="text"
              placeholder="Search by City"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Profession"
              value={searchProfessionText}
              onChange={(e) => handleProfessionChange(e.target.value)}
            />

            {suggestions.length > 0 && (
              <div className="suggestion-box">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => selectSuggestion(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* CATEGORY FILTERS */}
        <div className="profession-filters">

          {["Instructor", "Trainer", "Coach"].map((item) => (
            <button
              key={item}
              className={`profession-chip ${
                category === item ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </button>
          ))}

        </div>

        {/* SUB SERVICE LIST */}
        {categoryList.length > 0 && (
          <div className="sub-service-container">

            <h3 className="sub-service-title">
              Available {category} Services
            </h3>

            <div className="sub-service-list">

              {categoryList.map((service, index) => (
                <button
                  key={index}
                  className={`sub-service-chip ${
                    selectedService === service ? "active" : ""
                  }`}
                  onClick={() => handleServiceClick(service)}
                >
                  {service}
                </button>
              ))}

            </div>

          </div>
        )}

        {/* PROVIDERS */}
        <div className="providers-grid">

          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider, index) => (
              <ServiceProviderCard
                key={index}
                provider={provider}
              />
            ))
          ) : (
            <p className="no-results">No providers found</p>
          )}

        </div>

      </div>
    </div>
  )
}

export default ServiceListingFitness

