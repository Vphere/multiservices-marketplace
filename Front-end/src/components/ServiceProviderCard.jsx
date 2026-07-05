import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceProviderCard.css";

/* ================== SERVICE LISTS ================== */

const homeServices = [
  "Electrician","Plumber","Carpenter",
  "AC Repair & Service Technician","Refrigerator Repair Technician",
  "Washing Machine Repair Technician","Microwave / Appliance Repair Technician",
  "RO Water Purifier Technician","Geyser Repair Technician",
  "CCTV Installation Technician","Inverter & UPS Technician",
  "Home Deep Cleaning Specialist","Bathroom Cleaning Specialist",
  "Kitchen Deep Cleaning Specialist","Water Tank Cleaning Specialist"
];

const beautyServices = [
  "Women Salon Professional","Men Salon Professional","Hair Style Artist",
  "Makeup Artist","Bridal Makeup Artist","Facial",
  "Waxing Specialist","Nail Artist"
];

const fitnessServices = [
  "Yoga Instructor","Personal Fitness Trainer","Gym Trainer",
  "Zumba Instructor","Pilates Instructor","Meditation Coach",
  "Weight Loss Coach"
];

const artsServices = [
  "Music Teacher","Dance Instructor","Art & Painting Teacher",
  "Drawing / Sketching Instructor","Acting / Drama Coach",
  "Photography Instructor"
];

/* ================== ICON LOGIC ================== */

const getIcon = (profession) => {

  if (!profession) return "👤";

  // HOME SERVICES
  if (homeServices.includes(profession)) {
    if (profession.includes("Electrician")) return "⚡";
    if (profession.includes("Plumber")) return "🔧";
    if (profession.includes("Carpenter")) return "🪚";
    if (profession.includes("Cleaning")) return "🧹";
    return "🛠️";
  }

  // BEAUTY SERVICES
  if (beautyServices.includes(profession)) {
    if (profession.includes("Hair")) return "💇";
    if (profession.includes("Makeup")) return "💄";
    if (profession.includes("Nail")) return "💅";
    return "✨";
  }

  // FITNESS SERVICES
  if (fitnessServices.includes(profession)) {
    if (profession.includes("Yoga")) return "🧘";
    if (profession.includes("Zumba")) return "💃";
    if (profession.includes("Meditation")) return "🧠";
    return "🏋️";
  }

  // ARTS SERVICES
  if (artsServices.includes(profession)) {
    if (profession.includes("Music")) return "🎵";
    if (profession.includes("Dance")) return "💃";
    if (profession.includes("Painting") || profession.includes("Art")) return "🎨";
    if (profession.includes("Photography")) return "📸";
    return "🎭";
  }

  return "👤"; // default
};

/* ================== COMPONENT ================== */

const ServiceProviderCard = ({ provider }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/book-slot", {
      state: { provider }
    });
  };

  return (
    <div className="provider-card">

      {/* Header */}
      <div className="provider-header">
        <div className="provider-avatar">
          <span className="avatar-icon">
            {getIcon(provider.profession)}
          </span>
        </div>

        <div className="provider-info">
          <h3 className="provider-name">{provider.name}</h3>
          <p className="provider-profession">{provider.profession}</p>
        </div>
      </div>

      {/* Details */}
      <div className="provider-details">
        <div className="detail-row">
          <span>Experience</span>
          <strong>{provider.years} years</strong>
        </div>

        <div className="detail-row">
          <span>Location</span>
          <strong>{provider.city}</strong>
        </div>

        <div className="detail-row">
          <span>Price</span>
          <strong className="price">₹{provider.price}/service</strong>
        </div>
      </div>

      {/* Services */}
      <div className="provider-specialties">
        {provider.servicelist?.map((service, index) => (
          <span key={index} className="specialty-tag">
            {service}
          </span>
        ))}
      </div>

      {/* Button */}
      <button className="book-btn" onClick={handleBookNow}>
        Book Now
      </button>

    </div>
  );
};

export default ServiceProviderCard;