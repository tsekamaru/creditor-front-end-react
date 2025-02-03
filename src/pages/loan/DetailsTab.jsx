import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import IdsContext from "../../contexts/IdsContext";
import errorHandler from "../../utils/errorHandler";
import LoadingError from "../../components/LoadingError";

const DetailsTab = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ids, setIds } = useContext(IdsContext);
  const [customer, setCustomer] = useState({});
  const [loan, setLoan] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // API requests
    const fetchLoan = axios.get(`${API_URL}/loans/${id}`);
    const fetchCustomer = fetchLoan.then((loanResponse) => {
      const loanData = loanResponse.data;
      return axios.get(`${API_URL}/customers/${loanData.customerId}?_embed=loans`);
    });

    Promise.all([fetchLoan, fetchCustomer])
      .then(([loanResponse, customerResponse]) => {
        const loanData = loanResponse.data;
        const customerData = customerResponse.data;

        // Calculate remaining days
        const timeDiff = new Date(loanData.endDate) - new Date();
        const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        setLoan({ ...loanData, remainingDays });
        setCustomer(customerData);
      })
      .catch((error) => {
        errorHandler(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  return (
    <div className="container mt-5">
      {/* Go back & update buttons */}
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-success mb-3 fw-semibold" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Go Back
        </button>

        <button
          className="btn btn-secondary mb-3 fw-semibold"
          onClick={() => navigate(`/customers/update/${id}`)}
        >
          <i className="bi bi-pencil-square"></i> Update
        </button>
      </div>

      {/* Loan Info Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white fw-semibold">Loan Details</div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p>
                <strong>Loan ID:</strong> {loan.id}
              </p>
              <p>
                <strong>Customer ID:</strong> {loan.customerId}
              </p>
              <p>
                <strong>Start Date:</strong> {loan.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {loan.endDate}
              </p>
              <p>
                <strong>Interest Rate:</strong> {loan.interest}% per month
              </p>
            </div>
            <div className="col">
              <p>
                <strong>Loan Amount:</strong> ₮{loan.amount.toLocaleString()}
              </p>

              <p>
                <strong>Interest Amount:</strong> {loan.interestAmount.toLocaleString()}
              </p>
              <p>
                <strong>Total Payment:</strong> {loan.totalPayment.toLocaleString()}
              </p>
              <p>
                <strong>Remaining Days:</strong> {loan.remainingDays.toLocaleString()}
              </p>
              <p>
                <strong>On Track:</strong> {loan.overdue ? "🚩" : "✅"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info Card */}
      <div className="card shadow-sm hover-shadow mb-4">
        <div className="card-header bg-dark text-white fw-semibold">Customer Details</div>
        <div
          className="card-body hover-effect"
          onClick={() => {
            navigate(`/customers/details/${customer.id}`);
            setIds({ ...ids, customerId: customer.id });
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="row">
            <div className="col">
              <p>
                <strong>Customer ID:</strong> {customer.id}
              </p>
              <p>
                <strong>Name:</strong> {`${customer.firstName} ${customer.lastName}`}
              </p>
              <p>
                <strong>Credit Score:</strong> <span className="fs-5">★</span>
                {customer.creditScore}
              </p>
            </div>
            <div className="col">
              <p>
                <strong>Date of Birth:</strong> {customer.dateOfBirth}
              </p>
              <p>
                <strong>Loans:</strong> {customer.loans.length}
              </p>
              <p>
                <strong>Total Payable amount (incl. Interest):</strong> ₮
                {customer.loans.reduce((acc, loan) => acc + loan.totalPayment, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
