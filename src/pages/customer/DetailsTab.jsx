import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import IdsContext from "../../contexts/IdsContext";
import errorHandler from "../../utils/errorHandler";
import LoadingError from "../../components/LoadingError";

const DetailsTab = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { ids, setIds, refreshIds } = useContext(IdsContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/customers/${id}?_embed=loans`)
      .then((response) => {
        const loansWithRemainingDays = response.data.loans.map((loan) => {
          const timeDiff = new Date(loan.endDate) - new Date(); // Calculate time difference between end date and now
          const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
          return { ...loan, remainingDays };
        });
        setCustomer({ ...response.data, loans: loansWithRemainingDays });
      })
      .catch((error) => {
        errorHandler(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const deleteHandler = () => {
    axios
      .delete(`${API_URL}/customers/${id}`)
      .then(() => {
        console.log("Customer deleted successfully.");
        toast.info("Customer deleted successfully!");
        refreshIds();
        navigate("/customers/all");
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

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

      {/* Customer Info Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white fw-semibold">Customer Details</div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p>
                <strong>Customer ID:</strong> {customer.id}
              </p>
              <p>
                <strong>Name:</strong> {`${customer.firstName} ${customer.lastName}`}
              </p>
              <p>
                <strong>Date of Birth:</strong> {customer.dateOfBirth}
              </p>
              <p>
                <strong>Phone Number:</strong> {customer.phoneNumber}
              </p>
            </div>
            <div className="col">
              <p>
                <strong>Email address:</strong> {customer.email}
              </p>
              <p>
                <strong>Credit Score:</strong> <span className="fs-5">★</span>
                {customer.creditScore}
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

      {/* Loans Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white fw-semibold">Loans</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="bg-dark text-white text-center align-middle">
                <tr>
                  <th>Loan ID</th>
                  <th style={{ minWidth: "100px" }}>Start Date</th>
                  <th style={{ minWidth: "100px" }}>End Date</th>
                  <th>Interest (%)</th>
                  <th>Amount</th>
                  <th>Interest Amount</th>
                  <th>Total Payment</th>
                  <th>Remaining Days*</th>
                  <th>On Track</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {customer.loans.map((loan) => (
                  <tr
                    key={loan.id}
                    onClick={() => {
                      navigate(`/loans/details/${loan.id}`);
                      setIds({ ...ids, loanId: loan.id });
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{loan.id}</td>
                    <td>{loan.startDate}</td>
                    <td>{loan.endDate}</td>
                    <td>{loan.interest}%</td>
                    <td>₮{loan.amount.toLocaleString()}</td>
                    <td>₮{loan.interestAmount.toLocaleString()}</td>
                    <td>₮{loan.totalPayment.toLocaleString()}</td>
                    <td>{loan.remainingDays}</td>
                    <td>{loan.overdue ? "🚩" : "✅"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-end fw-semibold">
              <small>Negative amounts indicate the number of overdue days*</small>
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-outline-danger fw-semibold"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
        >
          <i className="bi bi-trash"></i> Delete
        </button>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteModalLabel">
                  Are you sure?
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Deleting will permanently remove this element from the system. This cannot be
                undone!
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={deleteHandler}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
