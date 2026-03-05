import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ServiceProviderCard from "../components/ServiceProviderCard"
import { getHomeService } from "../utils/apiFunction"
import "./ServiceListing.css"

const professionList = [
  "Electrician",
  "Plumber",
  "Carpenter",
  "AC Repair & Service Technician",
  "Refrigerator Repair Technician",
  "Washing Machine Repair Technician",
  "Microwave / Appliance Repair Technician",
  "RO Water Purifier Technician",
  "Geyser Repair Technician",
  "CCTV Installation Technician",
  "Inverter & UPS Technician",
  "Home Deep Cleaning Specialist",
  "Bathroom Cleaning Specialist",
  "Kitchen Deep Cleaning Specialist",
  "Water Tank Cleaning Specialist"
]

const ServiceListingHomeService = () => {
  const [providers, setProviders] = useState([])

  const [searchCity, setSearchCity] = useState("")
  const [searchProfessionText, setSearchProfessionText] = useState("")
  const [searchType, setSearchType] = useState("") // ✅ Quick Filter
  const [suggestions, setSuggestions] = useState([])

  const location = useLocation()

  // Insert selected service
  useEffect(() => {
    if (location.state?.selectedService) {
      setSearchProfessionText(location.state.selectedService)
    }
  }, [location.state])

  // Fetch providers
  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeService()
      if (data) {
        setProviders(Array.isArray(data) ? data : [data])
      }
    }
    fetchData()
  }, [])

  // Handle typing (HALF MATCH)
  const handleProfessionChange = (value) => {
    setSearchProfessionText(value)

    if (value.trim() === "") {
      setSuggestions([])
      return
    }

    const filtered = professionList.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    )

    setSuggestions(filtered)
  }

  const selectSuggestion = (item) => {
    setSearchProfessionText(item)
    setSuggestions([])
  }

  // ✅ Combined Filter Logic
  const filteredProviders = providers.filter((provider) => {
    const cityMatch = searchCity
      ? provider.city?.toLowerCase().includes(searchCity.toLowerCase())
      : true

    const professionMatch = searchProfessionText
      ? provider.profession
          ?.toLowerCase()
          .includes(searchProfessionText.toLowerCase())
      : true

    const quickFilterMatch = searchType
      ? provider.profession
          ?.toLowerCase()
          .includes(searchType.toLowerCase())
      : true

    return cityMatch && professionMatch && quickFilterMatch
  })

  return (
    <div className="service-listing">
      <div className="container">

        {/* Header */}
        <div className="listing-header">
          <h1 className="listing-title">Home Services</h1>
          <p className="listing-subtitle">
            Showing {filteredProviders.length} professionals
          </p>
        </div>

        {/* SEARCH SECTION */}
        <div className="search-wrapper">

          {/* City Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by City"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
            {searchCity && (
              <span
                className="clear-btn"
                onClick={() => setSearchCity("")}
              >
                ✖
              </span>
            )}
          </div>

          {/* Profession Search */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Profession"
              value={searchProfessionText}
              onChange={(e) =>
                handleProfessionChange(e.target.value)
              }
            />
            {searchProfessionText && (
              <span
                className="clear-btn"
                onClick={() => {
                  setSearchProfessionText("")
                  setSuggestions([])
                }}
              >
                ✖
              </span>
            )}

            {/* Suggestions */}
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

        {/* ✅ 5 Quick Filters Added */}
        <div className="profession-filters">
          {["Plumber", "Carpenter", "Electrician", "Technician", "Specialist"].map(
            (item) => (
              <button
                key={item}
                className={`profession-chip ${
                  searchType === item ? "active" : ""
                }`}
                onClick={() =>
                  setSearchType(searchType === item ? "" : item)
                }
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Providers */}
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

export default ServiceListingHomeService;