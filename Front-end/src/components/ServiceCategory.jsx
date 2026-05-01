import "./ServiceCategory.css";
import { useNavigate } from "react-router-dom";

const categories = [
  // 🔥 MOST BOOKED – Utility / Essential Services
  {
    id: 1,
    title: "AC Repair & Service",
    image: "https://www.airconditioning-cleaning.com/wp-content/uploads/2022/05/iStock-1351102754-scaled.jpg",
    route: "/services/home-services",
    profession: "AC Repair",
    selectedService: "AC Repair & Service"
  },
  {
    id: 2,
    title: "Electrician",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.m5keiSbkHU176I74w32CNgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    route: "/services/home-services",
    profession: "Electrician",
    selectedService: "Electrician"
  },
  {
    id: 3,
    title: "Plumber",
    image: "https://jollyplumbing.com/wp-content/uploads/2022/03/choose-a-residential-plumber.jpeg",
    route: "/services/home-services",
    profession: "Plumber",
    selectedService: "Plumbing Service"
  },
  {
    id: 4,
    title: "Cleaning & Pest Control",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
    route: "/services/home-services",
    profession: "Cleaning",
    selectedService: "Deep Cleaning"
  },
  {
    id: 5,
    title: "Appliance Repair",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
    route: "/services/home-services",
    profession: "Technician",
    selectedService: "Refrigerator Repair"
  },
  {
    id: 6,
    title: "Carpenter",
    image:
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=400&q=80",
    route: "/services/home-services",
    profession: "Carpenter",
    selectedService: "Carpenter"
  },
  {
    id: 7,
    title: "Home Painting",
    image:
      "https://www.familyhandyman.com/wp-content/uploads/2019/08/FH07FEB_475_52_101-interior-painting-tips-featured.jpg",
    route: "/services/home-services",
    profession: "Painter",
    selectedService: "Home Painting"
  },

  // 💄 BEAUTY SERVICES (High Demand but after utilities)
  {
    id: 8,
    title: "Salon for Women",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
    route: "/services/beauty",
    profession: "Salon for Women",
    selectedService: "Salon for Women"
  },
  {
    id: 9,
    title: "Salon for Men",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80",
    route: "/services/beauty",
    profession: "Salon for Men",
    selectedService: "Salon for Men"
  },
  {
    id: 10,
    title: "Spa & Massage",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80",
    route: "/services/beauty",
    profession: "Spa",
    selectedService: "Spa & Massage"
  },

  // 🎨 ARTS & RECREATION (Least booked – placed last)
  {
    id: 11,
    title: "Yoga & Fitness",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
    route: "/services/fitness",
    profession: "Fitness Trainer",
    selectedService: "Personal Gym Trainer"
  },
  {
    id: 12,
    title: "Arts & Recreation",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80",
    route: "/services/arts-recreation",
    profession: "Instructor",
    selectedService: "Dance Classes"
  },
];


const ServiceCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(category.route, {
      state: {
        selectedService: category.selectedService,
        profession: category.profession
      }
    });
  };

  return (
    <div className="categories-grid">
      {categories.map((category) => (
        <div 
          key={category.id} 
          className="category-card"
          onClick={() => handleCategoryClick(category)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={category.image}
            alt={category.title}
            loading="lazy"
          />
          <span>{category.title}</span>
        </div>
      ))}
    </div>
  );
};

export default ServiceCategory;
