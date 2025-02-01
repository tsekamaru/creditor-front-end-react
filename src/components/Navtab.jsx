import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";
import IdsContext from "../contexts/IdsContext";

const Navtab = ({ parentPage }) => {
  const location = useLocation();
  const { ids } = useContext(IdsContext);

  // Variable to get the correct details path using object key
  const idKeyMap = {
    customers: "customerId",
    loans: "loanId",
  };

  const tabs = [
    { path: "all", label: "All" },
    {
      path: `details/${ids[idKeyMap[parentPage]]}`,
      label: "Details",
    },
    { path: "add", label: "Add" },
    { path: "update", label: "Update" },
  ];

  return (
    <nav>
      <ul className="nav nav-tabs">
        {tabs.map(({ path, label }) => {
          const isActive = location.pathname.startsWith(`/${parentPage}/${path}`);

          return (
            <li className="nav-item" key={path}>
              <Link
                className={`nav-link text-secondary fw-semibold ${
                  isActive ? "active fw-bold text-dark" : ""
                }`}
                to={`/${parentPage}/${path}`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Navtab.propTypes = {
  parentPage: PropTypes.string.isRequired,
};

export default Navtab;
