import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../config";

const AddCustomerTab = () => {
  const [validated, setValidated] = useState(false); // State to manage form validation
  const emptyCustomer = { firstName: "", lastName: "", dateOfBirth: "", loanIds: "" };
  const [customer, setCustomer] = useState(emptyCustomer); // State to manage customer data
  const formRef = useRef(null); // Reference to form element
  const navigate = useNavigate(); // Navigation hook

  // Regex for positive integers with comma separation for Loan IDs input
  const regexLoanIDs = /^([1-9]\d*)(,[1-9]\d*)*$/;

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

      // Convert string input to array of integers and remove duplicates
      const parseLoanIDs = [...new Set(customer.loanIds.split(",").map(Number))];
      // Create a new customer object with the cleaned loanIds
      const customerData = { ...customer, loanIds: parseLoanIDs };
      setCustomer(customerData);
      axios
        .post(`${API_URL}/customers`, customerData)
        .then((response) => {
          console.log(response.data.message);
          toast.success("Customer added successfully!"); // Shows success toast - settings are in App.jsx
          setCustomer(emptyCustomer); // Reset customer state after posting
        })
        .catch((error) => {
          console.log(error);

          // Shows error toast
          if (!error.response) {
            toast.error("Network error. Please check your connection and try again.");
          } else if (error.response.status === 400) {
            toast.error("Invalid input. Please check the form and try again.");
          } else if (error.response.status === 404) {
            toast.error("The requested resource was not found. Please try again.");
          } else if (error.response.status === 409) {
            toast.error("This customer already exists. Try a different entry.");
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

  return (
    <div className="container mt-5">
      {/* Go back button */}
      <button className="btn btn-success mb-3 fw-semibold" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i> Go Back
      </button>

      {/* Add Customer Form */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white fw-semibold">Add Customer</div>
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
              <button className="btn btn-primary fw-semibold">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerTab;
