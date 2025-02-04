import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API_URL } from "../config";
import errorHandler from "../utils/errorHandler";

// Create Context
const IdsContext = createContext();

// Context Provider Component
export const IdsProvider = ({ children }) => {
  const [ids, setIds] = useState({ customerId: "1", loanId: "1" });
  const [trigger, setTrigger] = useState(0); // Added trigger state

  useEffect(() => {
    Promise.all([axios.get(`${API_URL}/customers`), axios.get(`${API_URL}/loans`)])
      .then(([customersRes, loansRes]) => {
        const customers = customersRes.data;
        const loans = loansRes.data;

        if (customers.length && loans.length) {
          setIds({
            customerId: customers[0].id, // First customer ID
            loanId: loans[0].id, // First loan ID
          });
        }
      })
      .catch((error) => {
        errorHandler(error);
      });
  }, [trigger]);

  return (
    <IdsContext.Provider value={{ ids, setIds, refreshIds: () => setTrigger((prev) => prev + 1) }}>
      {children}
    </IdsContext.Provider>
  );
};
IdsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdsContext;
