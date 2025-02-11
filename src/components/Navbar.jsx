import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/react.svg";
import AuthContext from "../contexts/AuthContext";

function Navbar() {
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);

  // Function to check if a tab should be active
  const isActive = (path, exact = false) => {
    return exact ? location.pathname === path : location.pathname.startsWith(path);
  };

  return (
    <nav
      className="navbar sticky-top navbar-expand-sm bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid d-flex justify-content-between">
        {/* Logo */}
        <Link to={"/"}>
          <img src={Logo} alt="Company Logo" width="40" height="40" />
        </Link>

        {/* Navbar Links */}
        {user && (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-sm-2">
                <Link className={`nav-link ${isActive("/", true) ? "active" : ""}`} to={"/"}>
                  Home
                </Link>
              </li>

              <li className="nav-item ms-sm-2">
                <Link
                  className={`nav-link ${isActive("/customers") ? "active" : ""}`}
                  to={"/customers/all"}
                >
                  Customers
                </Link>
              </li>

              <li className="nav-item ms-sm-2">
                <Link
                  className={`nav-link ${isActive("/loans") ? "active" : ""}`}
                  to={"/loans/all"}
                >
                  Loans
                </Link>
              </li>

              <li className="nav-item ms-sm-2">
                <Link
                  className={`nav-link ${isActive("/about", true) ? "active" : ""}`}
                  to={"/about"}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Logout button */}
        {user && (
          <button className="btn btn-secondary fw-medium" onClick={logout}>
            Logout
          </button>
        )}

        {/* Navbar Toggle for Mobile */}
        {user && (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
