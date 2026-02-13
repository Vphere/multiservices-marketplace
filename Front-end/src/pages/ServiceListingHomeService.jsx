import React, { useEffect, useState } from "react"
import ServiceProviderCard from "../components/ServiceProviderCard"
import { getHomeService } from "../utils/apiFunction"
import "./ServiceListing.css"

const ServiceListingHomeService = () => {
  const [providers, setProviders] = useState([])
  const [searchCity, setSearchCity] = useState("")

  /* ✅ ADDED */
  const [searchProfession, setSearchProfession] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeService()
      console.log("API DATA:", data)

      if (data) {
        setProviders(Array.isArray(data) ? data : [data])
      }
    }

    fetchData()
  }, [])

  /* ✅ EXTENDED FILTER (CITY + PROFESSION) */
  const filteredProviders = providers.filter((provider) => {
    const cityMatch = provider.city
      ?.toLowerCase()
      .includes(searchCity.toLowerCase())

    const professionMatch = searchProfession
      ? provider.profession
          ?.toLowerCase()
          .includes(searchProfession.toLowerCase())
      : true

    return cityMatch && professionMatch
  })

  return (
    <div className="service-listing">
      <div className="container">

        {/* Header */}
        <div className="listing-header">
          <h1 className="listing-title">Home Services</h1>
          <p className="listing-subtitle">
            Choose from {filteredProviders.length} verified professionals
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by city (e.g. Ahmedabad, Mehsana)"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
        </div>

        {/* ✅ PROFESSION QUICK FILTERS */}
        <div className="profession-filters">
          {["Electrician", "Plumber", "Carpenter", "Technician", "Specialist"].map(
            (item) => (
              <button
                key={item}
                className={`profession-chip ${
                  searchProfession === item ? "active" : ""
                }`}
                onClick={() =>
                  setSearchProfession(
                    searchProfession === item ? "" : item
                  )
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

export default ServiceListingHomeService
