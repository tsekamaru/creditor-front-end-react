import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IdsContext from "../../contexts/IdsContext";

const CustomersAllTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { ids, setIds } = useContext(IdsContext);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

  useEffect(() => {
    axios
      .get(`${API_URL}/customers`)
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error("Fetching error: ", error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [API_URL]);

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
        <p className="text-danger">Error fetching data. Please try again later.</p>
      </div>
    );

  return (
    <div className="container">
      <h1 className="text-center mb-4">Customers List</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr className="table-dark text-center">
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Loans</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr
                key={customer.id}
                className="bg-light border rounded shadow-sm text-center mt-2"
                onClick={() => {
                  navigate(`/customers/details/${customer.id}`);
                  setIds({ ...ids, customerId: customer.id });
                }}
                style={{ cursor: "pointer" }}
              >
                <td className="p-3">{customer.id}</td>
                <td className="p-3">{customer.firstName}</td>
                <td className="p-3">{customer.lastName}</td>
                <td className="p-3">{customer.dateOfBirth}</td>
                <td className="p-3">{customer.loanId.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersAllTab;
