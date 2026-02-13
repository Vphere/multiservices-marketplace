import "./ServiceCategory.css";

const categories = [
  {
    id: 1,
    title: "Salon for Women",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Salon for Men",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Spa & Massage",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 11,
    title: "Yoga & Fitness",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Cleaning & Pest Control",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
  },

  /* ✅ FIXED – REAL AC TECHNICIAN IMAGE */
  {
    id: 5,
    title: "AC Repair & Service",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
  },

  {
    id: 9,
    title: "Appliance Repair",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
  },

  /* ✅ FIXED – WORKING ELECTRICIAN IMAGE */
  {
    id: 6,
    title: "Electrician",
    image:
      "https://images.unsplash.com/photo-1629904869392-ae2a682d4d01?auto=format&fit=crop&w=400&q=80",
  },

  {
    id: 7,
    title: "Plumber",
    image:
      "https://images.unsplash.com/photo-1621905252472-943afaa20e20?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    title: "Carpenter",
    image:
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 10,
    title: "Home Painting",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 12,
    title: "Arts & Recreation",
    image:
      "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80",
  },
];

const ServiceCategory = () => {
  return (
    <div className="categories-grid">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
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
