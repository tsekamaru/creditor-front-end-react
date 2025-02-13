import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import IdsContext from "../../contexts/IdsContext";
import errorHandler from "../../utils/errorHandler";
import LoadingError from "../../components/LoadingError";
import DownloadButton from "../../components/DownloadButton";

const AllTab = () => {
  const [customers, setCustomers] = useState([]); // Stores fetched customers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { ids, setIds } = useContext(IdsContext);

  useEffect(() => {
    getDocs(collection(db, "customers"))
      .then((querySnapshot) => {
        const customerList = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Include all customer fields
        }));
        setCustomers(customerList); // Update state
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
      <div>
        <h1 className="text-center mb-4">
          Customers List
          <div className="d-flex justify-content-end">
            <DownloadButton inputData={customers} inputFileName="customersData" />
          </div>
        </h1>
      </div>
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
            {customers.map((customer) => (
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

export default AllTab;
