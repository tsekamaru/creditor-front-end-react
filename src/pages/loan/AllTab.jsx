import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import IdsContext from "../../contexts/IdsContext";
import errorHandler from "../../utils/errorHandler";
import LoadingError from "../../components/LoadingError";
import DownloadButton from "../../components/DownloadButton";

const AllTab = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { ids, setIds } = useContext(IdsContext);

  useEffect(() => {
    getDocs(collection(db, "loans"))
      .then((querySnapshot) => {
        const loanList = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Include all loan fields
        }));
        setLoans(loanList); // Update state
      })
      .catch((error) => {
        errorHandler(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  return (
    <div className="container">
      <h1 className="text-center mb-4">
        Loans List
        <div className="d-flex justify-content-end">
          <DownloadButton inputData={loans} inputFileName="loansData" />
        </div>
      </h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr className="table-dark text-center text-center align-middle">
              <th>ID</th>
              <th>Customer ID</th>
              <th style={{ minWidth: "8rem" }}>Start Date</th>
              <th style={{ minWidth: "8rem" }}>End Date</th>
              <th>Amount</th>
              <th>Interest</th>
              <th>Interest Amount</th>
              <th>Total Payment</th>
              <th>On Track</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr
                key={loan.id}
                className="bg-light border rounded shadow-sm text-center mt-2"
                onClick={() => {
                  navigate(`/loans/details/${loan.id}`);
                  setIds({ ...ids, loanId: loan.id });
                }}
                style={{ cursor: "pointer" }}
              >
                <td className="p-3">{loan.id}</td>
                <td className="p-3">{loan.customerId}</td>
                <td className="p-3">{loan.startDate}</td>
                <td className="p-3">{loan.endDate}</td>
                <td className="p-3">₮{loan.amount.toLocaleString()}</td>
                <td className="p-3">{loan.interest}%</td>
                <td className="p-3">₮{loan.interestAmount.toLocaleString()}</td>
                <td className="p-3">₮{loan.totalPayment.toLocaleString()}</td>
                <td className="p-3">{loan.overdue ? "🚩" : "✅"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTab;
