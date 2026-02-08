import "./FeaturedProviderCard.css";

const providers = [
  {
    id: 1,
    name: "Amit Sharma",
    category: "Electrician",
    rating: 4.8,
    experience: "5+ yrs",
  },
  {
    id: 2,
    name: "Priya Mehta",
    category: "Yoga Instructor",
    rating: 4.9,
    experience: "6+ yrs",
  },
  {
    id: 3,
    name: "Rohit Verma",
    category: "Plumber",
    rating: 4.7,
    experience: "4+ yrs",
  },
];

const FeaturedProviderCard = () => {
  return (
    <div className="featured-providers-grid">
      {providers.map((provider) => (
        <div key={provider.id} className="provider-card">
          <div className="provider-avatar">
            <span className="provider-initial">
              {provider.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>

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
