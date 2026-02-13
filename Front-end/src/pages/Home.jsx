import Hero from "../components/Hero.jsx";
import ServiceCategory from "../components/ServiceCategory.jsx";
import PopularServiceCard from "../components/PopularServiceCard.jsx";
import FeaturedProviderCard from "../components/FeaturedProviderCard.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { useNavigate } from "react-router-dom";

import "./Home.css";

/* ---------------- MOST BOOKED SERVICES ---------------- */
const mostBookedServices = [
  {
    id: 1,
    title: "AC Repair & Service",
    image: "https://www.airconditioning-cleaning.com/wp-content/uploads/2022/05/iStock-1351102754-scaled.jpg",
    rating: 4.8,
    price: "₹499",
  },
  {
    id: 2,
    title: "Electrician",
    image: "https://tse4.mm.bing.net/th/id/OIP.m5keiSbkHU176I74w32CNgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.6,
    price: "₹299",
  },
  {
    id: 3,
    title: "Plumbing Service",
    image: "https://jollyplumbing.com/wp-content/uploads/2022/03/choose-a-residential-plumber.jpeg",
    rating: 4.7,
    price: "₹399",
  },
  {
    id: 4,
    title: "Bathroom Deep Cleaning",
    image: "https://thebluebucketcleaning.com/wp-content/uploads/2022/07/Deep-Cleaning-Bathroom.jpg",
    rating: 4.7,
    price: "₹799",
  },
  {
    id: 5,
    title: "Kitchen Deep Cleaning",
    image: "https://tse4.mm.bing.net/th/id/OIP.JXNdrLDBs0H3zxkuLQgFfgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.8,
    price: "₹1299",
  },
  {
    id: 6,
    title: "RO Water Purifier Service",
    image: "https://standardaquaservices.com/wp-content/uploads/2024/11/Read-2-1024x1024.png",
    rating: 4.6,
    price: "₹399",
  },
  {
    id: 7,
    title: "Refrigerator Repair",
    image: "https://viking-repair-squad.com/wp-content/uploads/2023/10/torrance-ca-viking-freestanding-refrigerator-repair-service-near-me-viking-repair-squad.jpg",
    rating: 4.6,
    price: "₹499",
  },
  {
    id: 8,
    title: "Washing Machine Repair",
    image: "https://homeeguide.b-cdn.net/wp-content/uploads/2023/06/Washing-Machine-Repair-1.jpg",
    rating: 4.7,
    price: "₹499",
  },
  {
    id: 9,
    title: "Geyser Repair",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/10/550364027/UD/RO/SI/133447584/gas-geyser-repairing-service-1000x1000.png",
    rating: 4.6,
    price: "₹399",
  },
  {
    id: 10,
    title: "Salon for Women",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop&auto=format",
    rating: 4.9,
    price: "₹999",
  },
  {
    id: 11,
    title: "Salon for Men",
    image: "https://www.myrahspa.com/images/ServiceImages/service-651c0dc13f5731696337345.jpg",
    rating: 4.8,
    price: "₹799",
  },
  {
    id: 12,
    title: "Bridal Makeup",
    image: "https://i.pinimg.com/originals/f2/0a/33/f20a33de038e387e9dea863b773b1555.jpg",
    rating: 4.9,
    price: "₹4999",
  }
];


/* ---------------- NEW & NOTEWORTHY ---------------- */
const newAndNoteworthyServices = [
   {
    id: 1,
    title: "Spa & Massage",
    image:
      "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    price: "₹1499",
  },
  {
    id: 2,
    title: "Home Painting",
    image:"https://www.familyhandyman.com/wp-content/uploads/2019/08/FH07FEB_475_52_101-interior-painting-tips-featured.jpg",
    rating: 4.7,
    price: "₹2499",
  },
  {
    id: 3,
    title: "Kitchen Deep Cleaning",
    image: "https://tse4.mm.bing.net/th/id/OIP.JXNdrLDBs0H3zxkuLQgFfgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.8,
    price: "₹1299",
  },
  {
    id: 4,
    title: "Sofa Cleaning",
    image: "https://hometriangle.com/blogs/content/images/2023/12/Sofa-Cleaning---hometriangle-blog.jpg",
    rating: 4.7,
    price: "₹899",
  },
  {
    id: 5,
    title: "Garden Maintenance",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    price: "₹799",
  },
  {
    id: 6,
    title: "Pest Control",
    image: "https://images.pexels.com/photos/4099464/pexels-photo-4099464.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    price: "₹899",
  },
];

/* ---------------- ARTS & RECREATION ---------------- */
const artsAndRecreationServices = [
  // 🔥 HIGH DEMAND FITNESS SERVICES
  {
    id: 1,
    title: "Personal Gym Trainer",
    image: "https://th.bing.com/th/id/R.171a960302496b7bec8ecbf0f2f3b42c?rik=g60p1Wrj32YD9A&riu=http%3a%2f%2furec.uark.edu%2f_resources%2fimages%2ffitness_wellness%2fpersonal-trainer-1-compressor.jpg&ehk=YLv38VgQjNXV0Zu7fsjg0rTNkZJdkCT232Vz%2fFZDOh8%3d&risl=&pid=ImgRaw&r=0",
    rating: 4.9,
    price: "₹999 / session",
  },
  {
    id: 2,
    title: "Yoga Instructor",
    image: "https://www.doyou.com/wp-content/uploads/2021/07/57620818_151724482540178_1486999243370991842_n.jpeg",
    rating: 4.8,
    price: "₹499 / session",
  },
  {
    id: 3,
    title: "Zumba Trainer",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    price: "₹599 / session",
  },
  {
    id: 4,
    title: "Pilates Instructor",
    image: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    price: "₹699 / session",
  },
  {
    id: 5,
    title: "Meditation Coach",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    price: "₹499 / session",
  },
  {
    id: 6,
    title: "Weight Loss Coach",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    price: "₹799 / session",
  },

  // 🎵 PERFORMING ARTS (MEDIUM DEMAND)
  {
    id: 7,
    title: "Dance Classes",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop&auto=format",
    rating: 4.8,
    price: "₹799 / session",
  },
  {
    id: 8,
    title: "Music Lessons",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop&auto=format",
    rating: 4.7,
    price: "₹699 / session",
  },
  {
    id: 9,
    title: "Acting & Drama Classes",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    price: "₹899 / session",
  },

  // 🎨 CREATIVE ARTS (LOWER FREQUENCY BOOKINGS)
  {
    id: 10,
    title: "Art Classes",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&h=300&fit=crop&auto=format",
    rating: 4.6,
    price: "₹599 / session",
  },
  {
    id: 11,
    title: "Drawing & Sketching Classes",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    price: "₹499 / session",
  },
  {
    id: 12,
    title: "Photography Classes",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    price: "₹999 / session",
  },
];


const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <LoadingScreen />
      <Hero />

      {/* Service Categories Section */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">What are you looking for?</h2>

          <button className="explore-all-btn" onClick={() => navigate("/all-services")}> 
            Explore All Services →
          </button>
        </div>
        <ServiceCategory />
      </section>

      {/* Most Booked Services */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Most Booked Utility  and Grooming Services</h2>
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
          <h2 className="section-title">New & Noteworthy Services</h2>
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
          <h2 className="section-title">Arts & Recreation Services</h2>
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/Gemini_Generated_Image_nnva12nnva12nnva.png" alt="Urban Nexus Services" className="footer-logo-img" />
              <h3>Urban Nexus Services</h3>
              <p>Your trusted partner for professional home, lifestyle, and recreation services.</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#professionals">Professionals</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Popular Services</h4>
            <ul>
              <li><a href="#ac-repair">AC Repair</a></li>
              <li><a href="#cleaning">Deep Cleaning</a></li>
              <li><a href="#salon">Salon Services</a></li>
              <li><a href="#plumbing">Plumbing</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <p>📧 support@urbannexus.com</p>
              <p>📞 +91 1234567890</p>
              <p>📍 college road, nadiad, 387001</p>
              <p>🕐 Mon-Sat: 9AM-8PM, <br/>   Sun: 10AM-6PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Urban Nexus Services. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
