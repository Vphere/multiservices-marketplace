import React, { useEffect, useState } from "react"
import ServiceProviderCard from "../components/ServiceProviderCard"
import { getBeauty } from "../utils/apiFunction"
import "./ServiceListing.css"

const ServiceListingBeauty = () => {
  const [providers, setProviders] = useState([])
  const [searchCity, setSearchCity] = useState("")

  /* ✅ ADDED */
  const [searchType, setSearchType] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBeauty()
      console.log("API DATA:", data)

      if (data) {
        setProviders(Array.isArray(data) ? data : [data])
      }
    }

    fetchData()
  }, [])

  /* ✅ EXTENDED FILTER (CITY + TYPE) */
  const filteredProviders = providers.filter((provider) => {
    const cityMatch = provider.city
      ?.toLowerCase()
      .includes(searchCity.toLowerCase())

    const typeMatch = searchType
      ? provider.profession
          ?.toLowerCase()
          .includes(searchType.toLowerCase())
      : true

    return cityMatch && typeMatch
  })

  return (
    <div className="service-listing">
      <div className="container">

        {/* Header */}
        <div className="listing-header">
          <h1 className="listing-title">Beauty</h1>
          <p className="listing-subtitle">
            Choose from {filteredProviders.length} verified professionals
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by city (e.g. Ahmedabad, Vadodara)"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
        </div>

        {/* ✅ QUICK FILTERS */}
        <div className="profession-filters">
          {["Professional", "Artist", "Specialist"].map((item) => (
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
          ))}
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

export default ServiceListingBeauty
