import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import IdsContext from "../../contexts/IdsContext";
import errorHandler from "../../utils/errorHandler";
import LoadingError from "../../components/LoadingError";

const CustomersAllTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { ids, setIds } = useContext(IdsContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/customers`)
      .then((response) => setData(response.data))
      .catch((error) => {
        errorHandler(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  return (
    <div className="container">
      <h1 className="text-center mb-4">Customers List</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr className="table-dark text-center text-center align-middle">
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th style={{ minWidth: "8rem" }}>Date of Birth</th>
              <th>Credit Score*</th>
              <th>Phone Number</th>
              <th>Email</th>
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
                <td className="p-3">
                  <span className="fs-5">★</span>
                  {customer.creditScore}
                </td>
                <td className="p-3">{customer.phoneNumber}</td>
                <td className="p-3">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-end fw-semibold fs-6">
          <small>Credit score is out of 5.0*</small>
        </p>
      </div>
    </div>
  );
};

export default CustomersAllTab;
