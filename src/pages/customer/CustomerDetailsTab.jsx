import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

const CustomerDetailsTab = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({}); // Ensure "loans" is an empty array to avoid errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/customers/${id}?_embed=loans`)
      .then((response) => {
        const loansWithRemainingDays = response.data.loans.map((loan) => {
          const today = new Date();
          const endDate = new Date(loan.endDate);
          const timeDiff = endDate - today;
          const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          return { ...loan, remainingDays };
        });

        setData({ ...response.data, loans: loansWithRemainingDays });
      })
      .catch((error) => {
        console.log("Fetching error: ", error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (error)
    return (
      <div className="text-center mt-5">
        <p className="text-danger">There is no item to display ...</p>
      </div>
    );

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p className="">Loading...</p>
      </div>
    );

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
                <strong>ID:</strong> {data.id}
              </p>
              <p>
                <strong>Name:</strong> {`${data.firstName} ${data.lastName}`}
              </p>
              <p>
                <strong>Credit Score:</strong> <span className="fs-5">★</span>
                {data.creditScore}
              </p>
            </div>
            <div className="col">
              <p>
                <strong>Date of Birth:</strong> {data.dateOfBirth}
              </p>
              <p>
                <strong>Loans:</strong> {data.loans.length}
              </p>
              <p>
                <strong>Total Payable amount (incl. Interest):</strong> ₮
                {data.loans.reduce((acc, loan) => acc + loan.totalPayment, 0).toLocaleString()}
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
            <table className="table table-bordered table-striped">
              <thead className="bg-dark text-white text-center align-middle">
                <tr>
                  <th>Loan ID</th>
                  <th>Amount</th>
                  <th style={{ minWidth: "100px" }}>Start Date</th>
                  <th style={{ minWidth: "100px" }}>End Date</th>
                  <th>Interest (%)</th>
                  <th>Interest Amount</th>
                  <th>Total Payment</th>
                  <th>Remaining Days*</th>
                  <th>On Track</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {data.loans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>₮{loan.amount.toLocaleString()}</td>
                    <td>{loan.startDate}</td>
                    <td>{loan.endDate}</td>
                    <td>{loan.interest}%</td>
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
    </div>
  );
};

export default CustomerDetailsTab;
