import React, { useEffect, useState } from "react"
import ServiceProviderCard from "../components/ServiceProviderCard"
import { getHomeService } from "../utils/apiFunction"
import "./ServiceListing.css"

const ServiceListingHomeService = () => {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeService();
      console.log("API DATA:", data)

      if (data) {
        setProviders(Array.isArray(data) ? data : [data])
      }
    }

    fetchData()
  }, [])

  return (
    <div className="service-listing">
      <div className="container">
        <div className="listing-header">
          <h1 className="listing-title">Home Services</h1>
          <p className="listing-subtitle">
            Choose from {providers.length} verified professionals
          </p>
        </div>

        <div className="providers-grid">
          {providers.map((provider, index) => (
            <ServiceProviderCard
              key={index}
              provider={provider}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceListingHomeService
