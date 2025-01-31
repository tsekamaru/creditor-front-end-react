import { useState, useEffect } from "react";
import axios from "axios";

const CustomersAllTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5005/customers")
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log("fetching error: ", error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (error)
    return (
      <div className="text-center mt-5">
        <p className="">There is no item to display ...</p>
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
    <div>
      <h1>Customers All Tab</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Loans</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.dateOfBirth}</td>
              <td>{customer.loanId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersAllTab;
