import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CustomerDetailsTab = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({ loans: [] }); // Ensure "loans" is an empty array to avoid errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPaymentSum, setTotalPaymentSum] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

  useEffect(() => {
    axios
      .get(`${API_URL}/customers/${id}?_embed=loans`)
      .then((response) => {
        const loansWithRemainingDays = response.data.loans.map((loan) => {
          const today = new Date();
          const endDate = new Date(loan.endDate);
          const timeDiff = endDate - today;
          const remainingDays = Math.max(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)), 0);
          return { ...loan, remainingDays };
        });

        setData({ ...response.data, loans: loansWithRemainingDays });

        // Compute total payment sum
        const totalPayment = loansWithRemainingDays.reduce(
          (sum, loan) => sum + loan.totalPayment,
          0
        );
        const interestAmount = loansWithRemainingDays.reduce(
          (sum, loan) => sum + loan.interestAmount,
          0
        );
        setTotalPaymentSum(totalPayment + interestAmount);
      })
      .catch((error) => {
        console.log("Fetching error: ", error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id, API_URL]);

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
      {/* Go back button */}
      <button className="btn btn-success mb-3 fw-semibold" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i> Go Back
      </button>

      {/* Customer Info Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white">Customer Details</div>
        <div className="card-body">
          <p>
            <strong>ID:</strong> {data.id}
          </p>
          <p>
            <strong>First Name:</strong> {data.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {data.lastName}
          </p>
          <p>
            <strong>Date of Birth:</strong> {data.dateOfBirth}
          </p>
          <p>
            <strong>Loans:</strong> {data.loans.length}
          </p>
          <p>
            <strong>Total Payable amount (incl. Interest):</strong> ₮
            {totalPaymentSum.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Loans Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">Loans</div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="bg-dark text-white text-center align-middle">
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th style={{ minWidth: "100px" }}>Start Date</th>
                  <th style={{ minWidth: "100px" }}>End Date</th>
                  <th>Interest (%)</th>
                  <th>Interest Amount</th>
                  <th>Total Payment</th>
                  <th>Days to Pay</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsTab;
