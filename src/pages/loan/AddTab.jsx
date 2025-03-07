import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL } from "../../config";
import errorHandler from "../../utils/errorHandler";
import LoadingError from "../../components/LoadingError";
import { regexId } from "../../utils/regexPatterns";
import IdsContext from "../../contexts/IdsContext";

const AddTab = () => {
  const [validated, setValidated] = useState(false); // State to manage form validation
  const emptyLoan = {
    id: "",
    customerId: "",
    amount: "",
    startDate: "",
    endDate: "",
    interest: "",
    interestAmount: "",
    totalPayment: "",
    overdue: false,
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loan, setLoan] = useState(emptyLoan); // State to manage loan data
  const [customerIdValid, setCustomerIdValid] = useState(false); // State to manage customer ID validation
  const formRef = useRef(null); // Reference to form element
  const navigate = useNavigate(); // Navigation hook
  const { ids, setIds } = useContext(IdsContext);

  // Validate customer ID
  useEffect(() => {
    axios
      .get(`${API_URL}/customers`)
      .then((response) =>
        response.data.map((customer) => customer.id).includes(loan.customerId)
          ? setCustomerIdValid(true)
          : setCustomerIdValid(false)
      )
      .catch((error) => {
        errorHandler(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [loan.customerId]);

  // Event handler to update loan state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan((prevLoan) => {
      const updatedLoan = { ...prevLoan, [name]: value };

      // Convert numeric fields to numbers
      if (["id", "customerId", "amount", "interest"].includes(name)) {
        updatedLoan[name] = parseFloat(value) || null;
      }

      // Calculate interest amount and total payment
      if (["startDate", "endDate", "amount", "interest"].includes(name)) {
        const amount = parseFloat(updatedLoan.amount) || null;
        const interest = parseFloat(updatedLoan.interest) || null;
        const startDate = new Date(updatedLoan.startDate);
        const endDate = new Date(updatedLoan.endDate);

        if (!isNaN(startDate) && !isNaN(endDate)) {
          const timeDiff = endDate - startDate;
          const monthDiff = timeDiff / (1000 * 60 * 60 * 24 * 30);
          const interestAmount = Math.ceil(amount * monthDiff * (interest / 100));
          updatedLoan.interestAmount = interestAmount;
          updatedLoan.totalPayment = amount + interestAmount;
        }
      }

      // Calculate overdue status
      if (name === "startDate" || name === "endDate") {
        updatedLoan.overdue = new Date(updatedLoan.endDate) < new Date();
      }

      return updatedLoan;
    });
  };

  // Event handler to submit form data
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formRef.current.checkValidity()) {
      console.log("Form validated successfully!");
      setLoading(true);
      setValidated(false);

      axios
        .post(`${API_URL}/loans`, loan)
        .then((response) => {
          console.log(response.data.message);
          toast.success("Loan added successfully!"); // Shows success toast - settings are in App.jsx
          setLoan(emptyLoan); // Reset loan state after posting
          navigate(`/loans/details/${response.data.id}`); // Go back to the previous page
          setIds({ ...ids, loanId: response.data.id });
        })
        .catch((error) => {
          errorHandler(error);
          setError(true);
        })
        .finally(() => setLoading(false));
    } else {
      setValidated(true); // Enable Bootstrap validation feedback
      console.log("Form is still invalid!");
    }
  };

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  return (
    <div className="container mt-5">
      {/* Go back button */}
      <button className="btn btn-success mb-3 fw-semibold" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i> Go Back
      </button>

      {/* Add Loan Form */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white fw-semibold">Add Loan</div>
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
                className={`form-control ${
                  validated && (customerIdValid ? "is-valid" : "is-invalid")
                }`}
                type="number"
                name="customerId"
                id="customerId"
                value={loan.customerId ?? ""}
                placeholder=""
                onChange={handleChange}
                pattern={regexId.source} // Only allow positive integers
                required
              />
              <label className="form-label fw-semibold" htmlFor="customerId">
                Customer ID:
              </label>
              <div className="invalid-feedback">The Customer with this ID does not exist</div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="date"
                name="startDate"
                id="startDate"
                value={loan.startDate ?? ""}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="startDate">
                Start Date:
              </label>
              <div className="invalid-feedback">Please provide a valid date.</div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="date"
                name="endDate"
                id="endDate"
                value={loan.endDate ?? ""}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="endDate">
                End Date:
              </label>
              <div className="invalid-feedback">Please provide a valid date.</div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="number"
                name="amount"
                id="amount"
                value={loan.amount ?? ""}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="amount">
                Loan Amount:
              </label>
              <div className="invalid-feedback">Please provide a amount of a loan.</div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="number"
                name="interest"
                id="interest"
                value={loan.interest ?? ""}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="interest">
                Interest Rate:
              </label>
              <div className="invalid-feedback">Please provide a valid interest rate.</div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="number"
                name="interestAmount"
                id="interestAmount"
                value={loan.interestAmount ?? 0}
                placeholder=""
                onChange={handleChange}
                required
                disabled
              />
              <label className="form-label fw-semibold" htmlFor="interestAmount">
                Interest Amount:
              </label>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="number"
                name="totalPayment"
                id="totalPayment"
                value={loan.totalPayment ?? 0}
                placeholder=""
                onChange={handleChange}
                required
                disabled
              />
              <label className="form-label fw-semibold" htmlFor="totalPayment">
                Total Payment:
              </label>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="overdue"
                id="overdue"
                value={loan.overdue ? "🚩" : "✅"}
                placeholder=""
                onChange={handleChange}
                required
                disabled
              />
              <label className="form-label fw-semibold" htmlFor="overdue">
                On Track:
              </label>
            </div>

            {/* On track will be automatically calc here */}
            <div className="my-2">
              <button className="btn btn-primary fw-semibold">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTab;
