import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../config";

const UpdateCustomerTab = () => {
  const { id } = useParams(); // Get customer ID from URL params
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [validated, setValidated] = useState(false); // State to manage form validation
  const emptyCustomer = {
    id: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    loanIds: "",
  };
  const [customer, setCustomer] = useState(emptyCustomer); // State to manage customer data
  const formRef = useRef(null); // Reference to form element
  const navigate = useNavigate(); // Navigation hook

  // Regex for positive integers with comma separation for Loan IDs input
  const regexLoanIDs = /^([1-9]\d*)(,[1-9]\d*)*$/;
  const regexCustomerId = /^[1-9]\d*$/;

  // Fetch customer details when component mounts
  useEffect(() => {
    axios
      .get(`${API_URL}/customers/${id}`)
      .then((response) => setCustomer(response.data))
      .catch((error) => {
        console.log("Fetching error: ", error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id, API_URL]);

  // Event handler to update customer state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Event handler to submit form data
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formRef.current.checkValidity()) {
      console.log("Form validated successfully!");

      // Convert string input to array of integers and remove duplicates then save it to customerData object
      const parseLoanIDs = [...new Set(customer.loanIds.split(",").map(Number))];
      const customerData = { ...customer, loanIds: parseLoanIDs };

      axios
        .put(`${API_URL}/customers/${customer.id}`, customerData) // Use PUT for updating
        .then((response) => {
          console.log(response.data.message);
          toast.success("Customer updated successfully!"); // Show success toast
          navigate(-1); // Go back to previous page
        })
        .catch((error) => {
          console.log(error);

          // Error handling with toasts
          if (!error.response) {
            toast.error("Network error. Please check your connection and try again.");
          } else if (error.response.status === 400) {
            toast.error("Invalid input. Please check the form and try again.");
          } else if (error.response.status === 404) {
            toast.error("Customer not found.");
          } else if (error.response.status === 500) {
            toast.error("Server error. Please try again later.");
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        });
    } else {
      setValidated(true); // Enable Bootstrap validation feedback
      console.log("Form is still invalid!");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5">
        <p className="text-danger">
          Error occurred during fetching of data. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="container mt-5">
      {/* Go back button */}
      <button className="btn btn-success mb-3 fw-semibold" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i> Go Back
      </button>

      {/* Update Customer Form */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white fw-semibold">Update Customer</div>
        <div className="card-body">
          <form
            ref={formRef}
            className={`d-flex flex-column container-fluid mt-2 needs-validation ${
              validated ? "was-validated" : ""
            }`}
            onSubmit={handleFormSubmit}
            noValidate
          >
            <div className="form-floating mb-2">
              <input
                className="form-control"
                type="number"
                name="id"
                id="id"
                value={customer.id}
                placeholder=""
                onChange={handleChange}
                pattern={regexCustomerId.source}
                disabled
                required
              />
              <label className="form-label fw-semibold" htmlFor="firstName">
                Customer ID:
              </label>
              <div className="invalid-feedback">Please provide a valid customer ID.</div>
            </div>

            <div className="form-floating mb-2">
              <input
                className="form-control"
                type="text"
                name="firstName"
                id="firstName"
                value={customer.firstName}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="firstName">
                First Name:
              </label>
              <div className="invalid-feedback">Please provide a first name.</div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="lastName"
                id="lastName"
                value={customer.lastName}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="lastName">
                Last Name:
              </label>
              <div className="invalid-feedback">Please provide a last name.</div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={customer.dateOfBirth}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="dateOfBirth">
                Date of Birth:
              </label>
              <div className="invalid-feedback">Please provide a valid date of birth.</div>
            </div>

            {/* Loan IDs Field with Validation */}
            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="loanIds"
                id="loanIds"
                value={customer.loanIds}
                placeholder=""
                onChange={handleChange}
                pattern={regexLoanIDs.source}
                required
              />
              <label className="form-label fw-semibold" htmlFor="loanIds">
                Loan IDs (comma-separated):
              </label>
              <div className="invalid-feedback">
                Please provide a valid set of loan IDs. <br />
                Use comma-separated positive integers only (e.g., 1,26,55,128).
              </div>
            </div>

            <div className="my-2">
              <button className="btn btn-primary fw-semibold">Update Customer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomerTab;
