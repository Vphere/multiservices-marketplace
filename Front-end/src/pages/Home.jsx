import Hero from "../components/Hero.jsx";
import ServiceCategory from "../components/ServiceCategory.jsx";
import PopularServiceCard from "../components/PopularServiceCard.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  /* ---------------- HOME SERVICES ---------------- */
  const homeServices = [
    {
      id: 1,
      title: "AC Repair & Service Technician",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    },
    {
      id: 2,
      title: "Electrician",
      image: "https://tse4.mm.bing.net/th/id/OIP.m5keiSbkHU176I74w32CNgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      title: "Plumber",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39",
    },
    {
      id: 4,
      title: "Home Deep Cleaning Specialist",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL2myUwvU8c-JSlFRq01gU-X6MvxZL3ocHeg&s",
    },
    {
      id: 5,
      title: "RO Water Purifier Technician",
      image: "https://standardaquaservices.com/wp-content/uploads/2024/11/Read-2-1024x1024.png",
    },
  ];

  /* ---------------- BEAUTY SERVICES ---------------- */
  const beautyServices = [
    {
      id: 6,
      title: "Women Salon Professional",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    },
    {
      id: 7,
      title: "Men Salon Professional",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    },
    {
      id: 8,
      title: "Bridal Makeup Artist",
      image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
    },
    {
      id: 9,
      title: "Facial & Skincare Specialist",
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b",
    },
    {
      id: 10,
      title: "Nail Artist",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
    },
  ];

  /* ---------------- FITNESS SERVICES ---------------- */
  const fitnessServices = [
    {
      id: 11,
      title: "Yoga Instructor",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    },
    {
      id: 12,
      title: "Personal Fitness Trainer",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    },
    {
      id: 13,
      title: "Gym Trainer",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    },
    {
      id: 14,
      title: "Zumba Instructor",
      image: "https://images.unsplash.com/photo-1547153760-18fc86324498",
    },
    {
      id: 15,
      title: "Meditation Coach",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    },
  ];

  /* ---------------- ARTS & RECREATION ---------------- */
  const artsServices = [
    {
      id: 16,
      title: "Music Teacher",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    },
    {
      id: 17,
      title: "Dance Instructor",
      image: "https://images.unsplash.com/photo-1547153760-18fc86324498",
    },
    {
      id: 18,
      title: "Photography Instructor",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      id: 19,
      title: "Art & Painting Teacher",
      image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5",
    },
    {
      id: 20,
      title: "Drawing / Sketching Instructor",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    },
  ];

  return (
    <div className="home">
      <LoadingScreen />
      <Hero />

      {/* SERVICE CATEGORY SECTION */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">What Service Do You Need?</h2>
          <button
            className="explore-all-btn"
            onClick={() => navigate("/all-services")}
          >
            Explore All Services →
          </button>
        </div>
        <ServiceCategory />
      </section>

      {/* HOME SERVICES */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Home Services</h2>
        </div>
        <div className="horizontal-scroll">
          {homeServices.map(service => (
            <div
              key={service.id}
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
      </section>

      {/* BEAUTY SERVICES */}
      <section className="home-section light-bg">
        <div className="section-header">
          <h2 className="section-title">Beauty Services</h2>
        </div>
        <div className="horizontal-scroll">
          {beautyServices.map(service => (
            <div
              key={service.id}
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
      </section>

      {/* FITNESS SERVICES */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Fitness Services</h2>
        </div>
        <div className="horizontal-scroll">
          {fitnessServices.map(service => (
            <div
              key={service.id}
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
      </section>

      {/* ARTS & RECREATION */}
      <section className="home-section light-bg">
        <div className="section-header">
          <h2 className="section-title">Arts & Recreation</h2>
        </div>
        <div className="horizontal-scroll">
          {artsServices.map(service => (
            <div
              key={service.id}
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
      </section>

      {/* ABOUT SECTION */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">About Urban Nexus</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <h3>Your Trusted Service Partner</h3>
            <p>
              We connect customers with trusted professionals and ensure
              quality service delivery with complete satisfaction.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
