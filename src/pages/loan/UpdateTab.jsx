import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import errorHandler from "../../utils/errorHandler";
import LoadingError from "../../components/LoadingError";
import { regexId } from "../../utils/regexPatterns";

const UpdateTab = () => {
  const { loanId } = useParams(); // Get customer ID from URL params
  const [validated, setValidated] = useState(false); // State to manage form validation
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loan, setLoan] = useState({}); // State to manage loan data
  const [customerIdValid, setCustomerIdValid] = useState(false); // State to manage customer ID validation
  const formRef = useRef(null); // Reference to form element
  const navigate = useNavigate(); // Navigation hook

  // Fetch customer details when component mounts
  const getLoan = async (loanId) => {
    try {
      const docRef = doc(db, "loans", loanId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoan({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such loan!");
      }
    } catch (error) {
      console.error("Error fetching loan:", error);
      errorHandler(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoan(loanId);
  }, [loanId]);

  // Validate customer ID
  const checkCustomer = async (customerId) => {
    if (!customerId) return; // ✅ Prevents running with undefined ID

    try {
      const docRef = doc(db, "customers", customerId);
      const docSnap = await getDoc(docRef);

      setCustomerIdValid(docSnap.exists());
    } catch (error) {
      console.error("Error fetching customer:", error);
      errorHandler(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (loan.customerId) checkCustomer(loan.customerId);
  }, [loan.customerId]);

  // Event handler to update loan state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan((prevLoan) => {
      const updatedLoan = { ...prevLoan, [name]: value };

      // Convert numeric fields to numbers
      if (["amount", "interest"].includes(name)) {
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

  // Use PUT for updating
  const updateLoan = async (loanId, updatedFields) => {
    try {
      const loanRef = doc(db, "loans", loanId);
      await updateDoc(loanRef, updatedFields);
      console.log("Loan updated successfully!");
      toast.success("Loan updated successfully!"); // Show success toast
      navigate(`/loans/details/${loanId}`); // Go back to details tab after updating
    } catch (error) {
      console.error("Error updating loan:", error);
      errorHandler(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Event handler to submit form data
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formRef.current && formRef.current.checkValidity()) {
      console.log("Form validated successfully!");
      setLoading(true);
      setValidated(false);

      // Use PUT for updating
      updateLoan(loan.id, loan);
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

      {/* Update Loan Form */}
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
            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="id"
                id="id"
                value={loan.id ?? ""}
                placeholder=""
                onChange={handleChange}
                required
                disabled
              />
              <label className="form-label fw-semibold" htmlFor="startDate">
                Loan ID:
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                className={`form-control ${
                  validated && (customerIdValid ? "is-valid" : "is-invalid")
                }`}
                type="text"
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

            <div className="form-floating text-start my-2">
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
                className="form-control text-start"
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
              <button className="btn btn-primary fw-semibold">Update Loan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTab;
