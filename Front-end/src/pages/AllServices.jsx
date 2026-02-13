import "./AllServices.css";
import { useEffect } from "react";

const utilityServices = [
  "AC Repair & Service",
  "Electrician",
  "Plumber",
  "Cleaning & Pest Control",
  "Appliance Repair",
  "Carpenter",
  "Home Painting",
  "RO Water Purifier Service",
  "Refrigerator Repair",
  "Washing Machine Repair",
  "Geyser Repair",
];

const groomingServices = [
  "Salon for Women",
  "Salon for Men",
  "Spa & Massage",
  "Bridal Makeup",
];

const artsServices = [
  "Personal Gym Trainer",
  "Yoga Instructor",
  "Zumba Trainer",
  "Pilates Instructor",
  "Meditation Coach",
  "Weight Loss Coach",
  "Dance Classes",
  "Music Lessons",
  "Acting & Drama Classes",
  "Art Classes",
  "Drawing & Sketching Classes",
  "Photography Classes",
];

const AllServices = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <div className="all-services-page">

      <h1 className="all-services-title">Explore All Services</h1>

      {/* Utility */}
      <section>
        <h2>Utility Services</h2>
        <div className="all-services-grid">
          {utilityServices.map((service, index) => (
            <div key={index} className="service-box">{service}</div>
          ))}
        </div>
      </section>

      {/* Grooming */}
      <section>
        <h2>Grooming & Personal Care</h2>
        <div className="all-services-grid">
          {groomingServices.map((service, index) => (
            <div key={index} className="service-box">{service}</div>
          ))}
        </div>
      </section>

      {/* Arts */}
      <section>
        <h2>Arts & Recreation</h2>
        <div className="all-services-grid">
          {artsServices.map((service, index) => (
            <div key={index} className="service-box">{service}</div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AllServices;
