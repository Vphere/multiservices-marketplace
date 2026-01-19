import Hero from "../components/Hero.jsx";
import ServiceCategory from "../components/ServiceCategory.jsx";
import PopularServiceCard from "../components/PopularServiceCard.jsx";
import FeaturedProviderCard from "../components/FeaturedProviderCard.jsx";

import "./Home.css";

/* ---------------- MOST BOOKED SERVICES ---------------- */
const mostBookedServices = [
  {
    id: 1,
    title: "AC Repair & Service",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    rating: 4.8,
    price: "₹499",
  },
  {
    id: 2,
    title: "Bathroom Deep Cleaning",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    rating: 4.7,
    price: "₹799",
  },
  {
    id: 3,
    title: "Salon for Women",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    rating: 4.9,
    price: "₹999",
  },
  {
    id: 4,
    title: "Electrician",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
    rating: 4.6,
    price: "₹299",
  },
];

/* ---------------- NEW & NOTEWORTHY ---------------- */
const newAndNoteworthyServices = [
  {
    id: 1,
    title: "Spa & Massage",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    rating: 4.8,
    price: "₹1499",
  },
  {
    id: 2,
    title: "Home Painting",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    rating: 4.7,
    price: "₹2499",
  },
  {
    id: 3,
    title: "RO Water Purifier Service",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    rating: 4.6,
    price: "₹399",
  },
];

/* ---------------- ARTS & RECREATION ---------------- */
const artsAndRecreationServices = [
  {
    id: 1,
    title: "Yoga Instructor",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
    rating: 4.8,
    price: "₹499 / session",
  },
  {
    id: 2,
    title: "Zumba Trainer",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    rating: 4.7,
    price: "₹599 / session",
  },
  {
    id: 3,
    title: "Personal Gym Trainer",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
    rating: 4.9,
    price: "₹999 / session",
  },
];

const Home = () => {
  return (
    <div className="home">
      <Hero />

      <section className="home-section">
        <h2 className="section-title">What are you looking for?</h2>
        <ServiceCategory />
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Most Booked Services</h2>
          <button className="see-all-btn">See all</button>
        </div>

        <div className="horizontal-scroll">
          {mostBookedServices.map(service => (
            <PopularServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      <section className="home-section light-bg">
        <div className="section-header">
          <h2 className="section-title">New & Noteworthy</h2>
          <button className="see-all-btn">See all</button>
        </div>

        <div className="horizontal-scroll">
          {newAndNoteworthyServices.map(service => (
            <PopularServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Arts & Recreation</h2>
          <button className="see-all-btn">See all</button>
        </div>

        <div className="horizontal-scroll">
          {artsAndRecreationServices.map(service => (
            <PopularServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      <section className="home-section light-bg">
        <h2 className="section-title">Top Rated Professionals</h2>
        <FeaturedProviderCard />
      </section>
    </div>
  );
};

export default Home;
