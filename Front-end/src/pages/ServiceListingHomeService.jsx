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
  const [category, setCategory] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [categoryList, setCategoryList] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const location = useLocation()

  useEffect(() => {
    if (location.state?.selectedService) {
      setSearchProfessionText(location.state.selectedService)
    }

    if (location.state?.profession) {

      const profession = location.state.profession.toLowerCase()

      if (profession.includes("plumber")) {
        setCategory("Plumber")
      } 
      else if (profession.includes("carpenter")) {
        setCategory("Carpenter")
      } 
      else if (profession.includes("electrician")) {
        setCategory("Electrician")
      } 
      else if (
        profession.includes("technician") ||
        profession.includes("repair") ||
        profession.includes("ac")
      ) {
        setCategory("Technician")
      } 
      else if (
        profession.includes("cleaning") ||
        profession.includes("specialist")
      ) {
        setCategory("Specialist")
      }

    }

  }, [location.state])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeService()
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

    const filtered = professionList.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    )

    setSuggestions(filtered)
  }

  const selectSuggestion = (item) => {
    setSearchProfessionText(item)
    setSuggestions([])
  }

  const handleCategoryClick = (type) => {

    setCategory(type)
    setSelectedService("")

    const list = professionList.filter((item) =>
      item.toLowerCase().includes(type.toLowerCase())
    )

    setCategoryList(list)
  }

  const handleServiceClick = (service) => {
    setSelectedService(service)
  }

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

        <div className="listing-header">
          <h1 className="listing-title">Home Services</h1>
          <p className="listing-subtitle">
            Showing {filteredProviders.length} professionals
          </p>
        </div>

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

        <div className="profession-filters">

          {["Technician", "Specialist", "Plumber", "Electrician", "Carpenter"].map(
            (item) => (
              <button
                key={item}
                className={`profession-chip ${
                  category === item ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </button>
            )
          )}

        </div>

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