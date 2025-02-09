import PropTypes from "prop-types";

const TechCard = ({ logo, title }) => {
  return (
    <div className="col">
      <div className="card border-dark h-100" style={{ minWidth: "7rem" }}>
        <div className="card-header text-center fw-semibold bg-light border-dark">{title}</div>
        <div className="card-body d-flex justify-content-center align-items-center">
          <img src={logo} className="card-img" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

TechCard.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

export default TechCard;
