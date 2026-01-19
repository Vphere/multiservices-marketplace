import "./FeaturedProviderCard.css";

const providers = [
  {
    id: 1,
    name: "Amit Sharma",
    category: "Electrician",
    rating: 4.8,
    experience: "5+ yrs",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    id: 2,
    name: "Priya Mehta",
    category: "Yoga Instructor",
    rating: 4.9,
    experience: "6+ yrs",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    id: 3,
    name: "Rohit Verma",
    category: "Plumber",
    rating: 4.7,
    experience: "4+ yrs",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
  },
];

const FeaturedProviderCard = () => {
  return (
    <div className="featured-providers-grid">
      {providers.map((provider) => (
        <div key={provider.id} className="provider-card">
          <img
            src={provider.image}
            alt={provider.name}
            className="provider-image"
          />

          <div className="provider-info">
            <h4 className="provider-name">{provider.name}</h4>
            <p className="provider-category">{provider.category}</p>

            <div className="provider-meta">
              <span>⭐ {provider.rating}</span>
              <span>{provider.experience}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProviderCard;
