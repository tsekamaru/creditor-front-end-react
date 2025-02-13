import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import errorHandler from "../../utils/errorHandler";
import LoadingError from "../../components/LoadingError";
import { regexCreditScore, regexPhoneNumber } from "../../utils/regexPatterns";
import IdsContext from "../../contexts/IdsContext";

const AddTab = () => {
  const [validated, setValidated] = useState(false); // State to manage form validation
  const emptyCustomer = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    creditScore: "",
    phoneNumber: "",
    email: "",
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer); // State to manage customer data
  const formRef = useRef(null); // Reference to form element
  const navigate = useNavigate(); // Navigation hook
  const { ids, setIds } = useContext(IdsContext);

  // Event handler to update customer state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // add customer function
  const addCustomer = async (customerData) => {
    try {
      const docRef = await addDoc(collection(db, "customers"), customerData);
      console.log("Customer added with ID:", docRef.id);
      toast.success("Customer added successfully!"); // Shows success toast - settings are in App.jsx
      setCustomer(emptyCustomer); // Reset customer state after posting
      navigate(`/customers/details/${docRef.id}`); // Go back to the previous page
      setIds({ ...ids, customerId: docRef.id });
    } catch (error) {
      console.error("Error adding customer:", error);
      errorHandler(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Event handler to submit form data
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formRef.current.checkValidity()) {
      console.log("Form validated successfully!");

      const creditScoreNumber = parseFloat(customer.creditScore);
      const updatedCustomer = { ...customer, creditScore: creditScoreNumber };
      setLoading(true);

      addCustomer(updatedCustomer);
    } else {
      setValidated(true); // Enable Bootstrap validation feedback
      console.log("Form is still invalid!");
    }
  };

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  return (
    <div className="container mt-5">
      {/* Go back button */}
      <button className="btn btn-outline-dark mb-3 fw-semibold" onClick={() => navigate(-1)}>
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

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="creditScore"
                id="creditScore"
                value={customer.creditScore}
                placeholder=""
                onChange={handleChange}
                pattern={regexCreditScore.source}
                required
              />
              <label className="form-label fw-semibold" htmlFor="loanIds">
                Credit Score:
              </label>
              <div className="invalid-feedback">
                Please provide a valid credit score. <br />
                Enter a number between 0 and 5 with up to one decimal place.
              </div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={customer.phoneNumber}
                placeholder=""
                onChange={handleChange}
                pattern={regexPhoneNumber.source}
                required
              />
              <label className="form-label fw-semibold" htmlFor="dateOfBirth">
                Phone Number:
              </label>
              <div className="invalid-feedback">
                Please provide a valid phone number (8 digits).
              </div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={customer.email}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="dateOfBirth">
                Email:
              </label>
              <div className="invalid-feedback">Please provide a valid email.</div>
            </div>

            <div className="my-2">
              <button className="btn btn-primary fw-semibold">Add Customer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTab;
