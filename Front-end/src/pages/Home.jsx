import Hero from "../components/Hero.jsx";
import ServiceCategory from "../components/ServiceCategory.jsx";
import PopularServiceCard from "../components/PopularServiceCard.jsx";
import FeaturedProviderCard from "../components/FeaturedProviderCard.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

import "./Home.css";

/* ---------------- MOST BOOKED SERVICES ---------------- */
const mostBookedServices = [
  {
    id: 1,
    title: "AC Repair & Service",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    price: "₹499",
  },
  {
    id: 2,
    title: "Bathroom Deep Cleaning",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    price: "₹799",
  },
  {
    id: 3,
    title: "Salon for Women",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop&auto=format",
    rating: 4.9,
    price: "₹999",
  },
  {
    id: 4,
    title: "Electrician",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    price: "₹299",
  },
  {
    id: 5,
    title: "Plumbing Service",
    image: "https://images.unsplash.com/photo-1580924929049-5d7572b40b69?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    price: "₹399",
  },
  {
    id: 6,
    title: "Home Painting",
    image: "https://images.unsplash.com/photo-1589883244688-3d4c7d764eb7?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    price: "₹2499",
  },
  {
    id: 7,
    title: "Carpet Cleaning",
    image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    price: "₹599",
  },
  {
    id: 8,
    title: "Pest Control",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    price: "₹899",
  },
];

/* ---------------- NEW & NOTEWORTHY ---------------- */
const newAndNoteworthyServices = [
  {
    id: 1,
    title: "Spa & Massage",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    price: "₹1499",
  },
  {
    id: 2,
    title: "Home Painting",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    price: "₹2499",
  },
  {
    id: 3,
    title: "RO Water Purifier Service",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    price: "₹399",
  },
  {
    id: 4,
    title: "Kitchen Deep Cleaning",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    price: "₹1299",
  },
  {
    id: 5,
    title: "Sofa Cleaning",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    price: "₹899",
  },
  {
    id: 6,
    title: "Garden Maintenance",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    price: "₹799",
  },
];

/* ---------------- ARTS & RECREATION ---------------- */
const artsAndRecreationServices = [
  {
    id: 1,
    title: "Yoga Instructor",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    price: "₹499 / session",
  },
  {
    id: 2,
    title: "Zumba Trainer",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    price: "₹599 / session",
  },
  {
    id: 3,
    title: "Personal Gym Trainer",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop&auto=format",
    rating: 4.9,
    price: "₹999 / session",
  },
  {
    id: 4,
    title: "Dance Classes",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    price: "₹799 / session",
  },
  {
    id: 5,
    title: "Music Lessons",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    price: "₹699 / session",
  },
  {
    id: 6,
    title: "Art Classes",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    price: "₹599 / session",
  },
];

const Home = () => {
  return (
    <div className="home">
      <LoadingScreen />
      <Hero />

      {/* Service Categories Section */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">What are you looking for?</h2>
        </div>
        <ServiceCategory />
      </section>

      {/* Most Booked Services */}
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

      {/* New & Noteworthy */}
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

      {/* Arts & Recreation */}
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

      {/* Top Rated Professionals */}
      <section className="home-section light-bg">
        <div className="section-header">
          <h2 className="section-title">Top Rated Professionals</h2>
          <button className="see-all-btn">View all professionals</button>
        </div>
        <FeaturedProviderCard />
      </section>

      {/* About Us */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">About Us</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <h3>Welcome to Urban Nexus Services</h3>
            <p>Your trusted partner for professional home, lifestyle, and recreation services. We connect you with verified service providers who deliver excellence right at your doorstep.</p>
            <p>Our mission is to make quality services accessible, reliable, and affordable for everyone. With rigorous vetting processes and customer-centric approach, we ensure your satisfaction is always guaranteed.</p>
          </div>
          <div className="about-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Verified Professionals</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Quality Assured</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>24/7 Support</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Easy Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="home-section light-bg">
        <div className="section-header">
          <h2 className="section-title">Contact Us</h2>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>We're here to help you with any questions or concerns.</p>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>support@urbannexus.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+91 1234567890</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span> college road, nadiad, 387001</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <span>Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</span>
            </div>
          </div>
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <form>
              <input type="text" placeholder="Your Name" className="contact-input" />
              <input type="email" placeholder="Your Email" className="contact-input" />
              <textarea placeholder="Your Message" className="contact-textarea" rows="4"></textarea>
              <button type="submit" className="contact-submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
