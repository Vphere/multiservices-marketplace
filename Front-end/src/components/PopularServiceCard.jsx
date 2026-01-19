import "./PopularServiceCard.css";

const PopularServiceCard = ({ title, image, rating, price }) => {
  return (
    <div className="service-card">
      {/* Image */}
      <div className="service-image-wrapper">
        <img src={image} alt={title} className="service-image" />
      </div>

      {/* Content */}
      <div className="service-content">
        <h4 className="service-title">{title}</h4>

        <div className="service-meta">
          {rating && (
            <span className="service-rating">
              ⭐ {rating}
            </span>
          )}

          {price && (
            <span className="service-price">
              {price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularServiceCard;
