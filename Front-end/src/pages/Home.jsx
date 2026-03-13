import Hero from "../components/Hero.jsx";
import ServiceCategory from "../components/ServiceCategory.jsx";
import PopularServiceCard from "../components/PopularServiceCard.jsx";
import FeaturedProviderCard from "../components/FeaturedProviderCard.jsx";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import "./Home.css";

/* ---------------- MOST BOOKED SERVICES ---------------- */

const homeServices = [
  {
    id: 1,
    title: "AC Repair & Service",
    image: "https://www.airconditioning-cleaning.com/wp-content/uploads/2022/05/iStock-1351102754-scaled.jpg",
    price: "₹499",
  },
  {
    id: 2,
    title: "Electrician",
    image: "https://tse4.mm.bing.net/th/id/OIP.m5keiSbkHU176I74w32CNgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: "₹299",
  },
  {
    id: 3,
    title: "Plumbing Service",
    image: "https://jollyplumbing.com/wp-content/uploads/2022/03/choose-a-residential-plumber.jpeg",
    price: "₹399",
  },
  {
    id: 4,
    title: "Bathroom Deep Cleaning",
    image: "https://thebluebucketcleaning.com/wp-content/uploads/2022/07/Deep-Cleaning-Bathroom.jpg",
    price: "₹799",
  },
  {
    id: 5,
    title: "Kitchen Deep Cleaning",
    image: "https://tse4.mm.bing.net/th/id/OIP.JXNdrLDBs0H3zxkuLQgFfgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: "₹1299",
  },
  {
    id: 6,
    title: "RO Water Purifier Service",
    image: "https://standardaquaservices.com/wp-content/uploads/2024/11/Read-2-1024x1024.png",
    price: "₹399",
  },
  {
    id: 7,
    title: "Refrigerator Repair",
    image: "https://viking-repair-squad.com/wp-content/uploads/2023/10/torrance-ca-viking-freestanding-refrigerator-repair-service-near-me-viking-repair-squad.jpg",
    price: "₹499",
  },
  {
    id: 8,
    title: "Washing Machine Repair",
    image: "https://tse3.mm.bing.net/th/id/OIP.hMEAdA5Q7zNJFuzUH3OBkQHaEc?rs=1&pid=ImgDetMain&o=7&rm=3",
    price: "₹499",
  },
  {
    id: 9,
    title: "Geyser Repair",
    image: "https://5.imimg.com/data5/SELLER/Default/2025/10/550364027/UD/RO/SI/133447584/gas-geyser-repairing-service-1000x1000.png",
    price: "₹399",
  },
  {
    id: 10,
    title: "Home Painting",
    image: "https://www.familyhandyman.com/wp-content/uploads/2019/08/FH07FEB_475_52_101-interior-painting-tips-featured.jpg",
    price: "₹2499",
  },
  {
    id: 11,
    title: "Sofa Cleaning",
    image: "https://hometriangle.com/blogs/content/images/2023/12/Sofa-Cleaning---hometriangle-blog.jpg",
    price: "₹899",
  },
  {
    id: 12,
    title: "Garden Maintenance",
    image: "https://eden-gardens.co.uk/wp-content/uploads/2022/12/Commercial-Garden-Maintenance-West-London-1024x684.jpg",
    price: "₹799",
  },
  {
    id: 13,
    title: "Pest Control",
    image: "https://images.pexels.com/photos/4099464/pexels-photo-4099464.jpeg",
    price: "₹899",
  },
];

const beautyServices = [
  {
    id: 1,
    title: "Salon for Women",
    image: "https://www.liveabout.com/thmb/nO4ozKgcWMuMo7Fhg3_v8zQCha8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/182657613-56a08acf5f9b58eba4b1656a.jpg",
    price: "₹999",
  },
  {
    id: 2,
    title: "Salon for Men",
    image: "https://www.myrahspa.com/images/ServiceImages/service-651c0dc13f5731696337345.jpg",
    price: "₹799",
  },
  {
    id: 3,
    title: "Bridal Makeup",
    image: "https://i.pinimg.com/originals/f2/0a/33/f20a33de038e387e9dea863b773b1555.jpg",
    price: "₹4999",
  },
  {
    id: 4,
    title: "Spa & Massage",
    image: "https://wallpapercave.com/wp/wp11244907.jpg",
    price: "₹1499",
  },
  {
    id: 5,
    title: "Hair Styling",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
    price: "₹599",
  },
  {
    id: 6,
    title: "Facial Treatment",
    image: "https://spadaspa.com/wp-content/uploads/2023/03/Day-Spa_Facials-SkinCare_Header_1920x1080.jpg",
    price: "₹899",
  },
  {
    id: 7,
    title: "Nail Art",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
    price: "₹499",
  }
];

const fitnessServices = [
  {
    id: 1,
    title: "Personal Gym Trainer",
    image: "https://urec.uark.edu/_resources/images/fitness_wellness/personal-trainer-1-compressor.jpg",
    price: "₹999 / session",
  },
  {
    id: 2,
    title: "Yoga Instructor",
    image: "https://www.doyou.com/wp-content/uploads/2021/07/57620818_151724482540178_1486999243370991842_n.jpeg",
    price: "₹499 / session",
  },
  {
    id: 3,
    title: "Zumba Trainer",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    price: "₹599 / session",
  },
  {
    id: 4,
    title: "Pilates Instructor",
    image: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285",
    price: "₹699 / session",
  },
  {
    id: 5,
    title: "Meditation Coach",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    price: "₹499 / session",
  },
  {
    id: 6,
    title: "Weight Loss Coach",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    price: "₹799 / session",
  },
];

const artsRecreationServices = [
  {
    id: 1,
    title: "Dance Classes",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498",
    price: "₹799 / session",
  },
  {
    id: 2,
    title: "Music Lessons",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    price: "₹699 / session",
  },
  {
    id: 3,
    title: "Acting & Drama Classes",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    price: "₹899 / session",
  },
  {
    id: 4,
    title: "Art Classes",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5",
    price: "₹599 / session",
  },
  {
    id: 5,
    title: "Drawing & Sketching Classes",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    price: "₹499 / session",
  },
  {
    id: 6,
    title: "Photography Classes",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    price: "₹999 / session",
  },
];
/* ---------------- COMPONENT ---------------- */

const Home = () => {
  const navigate = useNavigate();

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollRef3 = useRef(null);
  const scrollRef4 = useRef(null);

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  const handleWheel = (ref, e) => {
    if (!ref.current) return;

    if (e.deltaY !== 0) {
      e.preventDefault();
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        ref.current.scrollBy({ 
          left: e.deltaY * 2, // Increase scroll speed
          behavior: "smooth" 
        });
      });
    }
  };

  return (
    <div className="home">
      <Hero />

      {/* SERVICE CATEGORY */}

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">What Services Do You Need?</h2>

          <button
            className="explore-all-btn"
            onClick={() => navigate("/all-services")}
          >
            Explore All Services →
          </button>
        </div>

        <ServiceCategory />
      </section>

      {/* Home Services */}

      <section id="home-services" className="home-section">
        <div className="section-header">
          <h2 className="section-title">
            Home Services
          </h2>
        </div>

        <div className="scroll-wrapper">
          <div className="scroll-container-wrapper">
            <div
              className="horizontal-scroll"
              ref={scrollRef1}
              onWheel={(e) => handleWheel(scrollRef1, e)}
            >
              {homeServices.map(service => (
                <div
                  key={service.id}
                  className="scroll-item"
                  onClick={() =>
                    navigate("/services/home-services", {
                      state: { selectedService: service.title }
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <PopularServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
          <button
            className="scroll-arrow-btn scroll-arrow-right"
            onClick={() => scrollRight(scrollRef1)}
            aria-label="Scroll right"
          >
            <span className="scroll-arrow-icon"></span>
          </button>
        </div>
      </section>

      {/* Beauty SERVICES */}

      <section id="beauty-services" className="home-section light-bg">
        <div className="section-header">
          <h2 className="section-title">Beauty Services</h2>
        </div>

        <div className="scroll-wrapper">
          <div className="scroll-container-wrapper">
            <div
              className="horizontal-scroll"
              ref={scrollRef2}
              onWheel={(e) => handleWheel(scrollRef2, e)}
            >
              {beautyServices.map(service => (
                <div
                  key={service.id}
                  className="scroll-item"
                  onClick={() =>
                    navigate("/services/beauty", {
                      state: { selectedService: service.title }
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <PopularServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
          <button
            className="scroll-arrow-btn scroll-arrow-right"
            onClick={() => scrollRight(scrollRef2)}
            aria-label="Scroll right"
          >
            <span className="scroll-arrow-icon"></span>
          </button>
        </div>
      </section>

      {/* Fitness services */}

      <section id="fitness-services" className="home-section">
        <div className="section-header">
          <h2 className="section-title">Fitness Services</h2>
        </div>

        <div className="scroll-wrapper">
          <div className="scroll-container-wrapper">
            <div
              className="horizontal-scroll fitness-scroll"
              ref={scrollRef3}
              onWheel={(e) => handleWheel(scrollRef3, e)}
              style={{ overscrollBehavior: "contain" }}
            >
             {fitnessServices.map(service => (
                <div
                  key={service.id}
                  className="scroll-item"
                  onClick={() =>
                    navigate("/services/fitness", {
                      state: { selectedService: service.title }
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <PopularServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
          <button
            className="scroll-arrow-btn scroll-arrow-right"
            onClick={() => scrollRight(scrollRef3)}
            aria-label="Scroll right"
          >
            <span className="scroll-arrow-icon"></span>
          </button>
        </div>
      </section>

      {/* ARTS & RECREATION */}
      <section id="arts-recreation" className="home-section light-bg">
        <div className="section-header">
          <h2 className="section-title">Arts & Recreation</h2>
        </div>

        <div className="scroll-wrapper">
          <div className="scroll-container-wrapper">
            <div
              className="horizontal-scroll"
              ref={scrollRef4}
              onWheel={(e) => handleWheel(scrollRef4, e)}
            >
              {artsRecreationServices.map(service => (
                <div
                  key={service.id}
                  className="scroll-item"
                  onClick={() =>
                    navigate("/services/arts-recreation", {
                      state: { selectedService: service.title }
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <PopularServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
          <button
            className="scroll-arrow-btn scroll-arrow-right"
            onClick={() => scrollRight(scrollRef4)}
            aria-label="Scroll right"
          >
            <span className="scroll-arrow-icon"></span>
          </button>
        </div>
      </section>

      {/* ABOUT */}

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">About Us</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Welcome to Urban Nexus Services</h3>
            <p>
              Your trusted partner for professional home, lifestyle, and
              recreation services.
            </p>
            <p>
              We connect you with verified service providers who deliver excellence right at your doorstep. Our mission is to make quality services accessible, reliable, and affordable for everyone.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Verified Professionals</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Services Offered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL FOOTER */}

      <footer className="footer">
        <div className="footer-content">

          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-circle">
                <img
                  src="/Gemini_Generated_Image_nnva12nnva12nnva.png"
                  alt="Urban Nexus Services"
                  className="footer-logo-img"
                  style={{ width: 50, height: 50 }}
                />
              </div>
              <h3>Urban Nexus Services</h3>
              <p>
                Your trusted partner for professional home, lifestyle,
                and recreation services.
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home-services">Home Services</a></li>
              <li><a href="#beauty-services">Beauty Services</a></li>
              <li><a href="#fitness-services">Fitness Services</a></li>
              <li><a href="#arts-recreation">Arts & Recreation</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Popular Services</h4>
            <ul>
              <li><a href="#" onClick={() => navigate("/services/home-services", { state: { selectedService: "AC Repair" } })}>AC Repair</a></li>
              <li><a href="#" onClick={() => navigate("/services/home-services", { state: { selectedService: "Deep Cleaning" } })}>Deep Cleaning</a></li>
              <li><a href="#" onClick={() => navigate("/services/beauty", { state: { selectedService: "Salon for Women" } })}>Salon for Women</a></li>
              <li><a href="#" onClick={() => navigate("/services/home-services", { state: { selectedService: "Electrician" } })}>Electrician</a></li>
              <li><a href="#" onClick={() => navigate("/services/home-services", { state: { selectedService: "Plumbing Service" } })}>Plumbing Service</a></li>
              <li><a href="#" onClick={() => navigate("/services/home-services", { state: { selectedService: "Home Painting" } })}>Home Painting</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <p>📧 support@urbannexus.com</p>
              <p>📞 +91 1234567890</p>
              <p>📍 college road, nadiad, 387001</p>
              <p>🕐 Mon-Sat: 9AM-8PM</p>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 Urban Nexus Services. All rights reserved.</p>

          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;