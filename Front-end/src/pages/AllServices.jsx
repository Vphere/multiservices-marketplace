import "./AllServices.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const homeServices = [
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
];

const beautyServices = [
  "Women Salon Professional",
  "Men Salon Professional",
  "Hair Style Artist",
  "Makeup Artist",
  "Bridal Makeup Artist",
  "Facial & Skincare Specialist",
  "Waxing Specialist",
  "Nail Artist"
];

const fitnessServices = [
  "Yoga Instructor",
  "Personal Fitness Trainer",
  "Gym Trainer",
  "Zumba Instructor",
  "Pilates Instructor",
  "Meditation Coach",
  "Weight Loss Coach"
];

const artsServices = [
  "Music Teacher",
  "Dance Instructor",
  "Art & Painting Teacher",
  "Drawing / Sketching Instructor",
  "Acting / Drama Coach",
  "Photography Instructor"
];

const AllServices = () => {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = (path, service) => {
    navigate(path, {
      state: { selectedService: service }
    });
  };

  return (
    <div className="all-services-page">

      <h1 className="all-services-title">Explore All Services</h1>

      {/* Home Services */}
      <section>
        <h2>Home Services</h2>
        <div className="all-services-grid">
          {homeServices.map((service, index) => (
            <div
              key={index}
              className="service-box"
              onClick={() =>
                handleNavigate("/services/home-services", service)
              }
              style={{ cursor: "pointer" }}
            >
              {service}
            </div>
          ))}
        </div>
      </section>

      {/* Beauty */}
      <section>
        <h2>Beauty</h2>
        <div className="all-services-grid">
          {beautyServices.map((service, index) => (
            <div
              key={index}
              className="service-box"
              onClick={() =>
                handleNavigate("/services/beauty", service)
              }
              style={{ cursor: "pointer" }}
            >
              {service}
            </div>
          ))}
        </div>
      </section>

      {/* Fitness */}
      <section>
        <h2>Fitness</h2>
        <div className="all-services-grid">
          {fitnessServices.map((service, index) => (
            <div
              key={index}
              className="service-box"
              onClick={() =>
                handleNavigate("/services/fitness", service)
              }
              style={{ cursor: "pointer" }}
            >
              {service}
            </div>
          ))}
        </div>
      </section>

      {/* Arts & Recreation */}
      <section>
        <h2>Arts & Recreation</h2>
        <div className="all-services-grid">
          {artsServices.map((service, index) => (
            <div
              key={index}
              className="service-box"
              onClick={() =>
                handleNavigate("/services/arts-recreation", service)
              }
              style={{ cursor: "pointer" }}
            >
              {service}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AllServices;
