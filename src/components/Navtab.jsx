import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Navtab = ({ parentPage }) => {
  const location = useLocation();

  const tabs = [
    { path: "all", label: "All" },
    { path: "details", label: "Details" },
    { path: "add", label: "Add" },
    { path: "update", label: "Update" },
  ];

  return (
    <nav>
      <ul className="nav nav-tabs">
        {tabs.map(({ path, label }) => (
          <li className="nav-item" key={path}>
            <Link
              className={`nav-link ${
                location.pathname === `/${parentPage}/${path}` ? "active" : ""
              }`}
              to={`/${parentPage}/${path}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navtab.propTypes = {
  parentPage: PropTypes.string.isRequired,
};

export default Navtab;
