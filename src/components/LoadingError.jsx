import PropTypes from "prop-types";

const LoadingError = ({ loading = false, error = false }) => {
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );
  } else if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">Error occurred in the fetching.</p>
      </div>
    );
  } else {
    return null;
  }
};
LoadingError.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default LoadingError;
