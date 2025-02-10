import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import errorHandler from "../utils/errorHandler";

// Create Context
const IdsContext = createContext();

// Context Provider Component
export const IdsProvider = ({ children }) => {
  const [ids, setIds] = useState({ customerId: "1", loanId: "1" });
  const [trigger, setTrigger] = useState(0); // Added trigger state

  const fetchIdsFromFirestore = async () => {
    try {
      const customersSnapshot = await getDocs(collection(db, "customers"));
      const loansSnapshot = await getDocs(collection(db, "loans"));

      const customers = customersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const loans = loansSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (customers.length && loans.length) {
        return {
          customerId: customers[0].id, // First customer ID
          loanId: loans[0].id, // First loan ID
        };
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    fetchIdsFromFirestore().then((data) => setIds(data));
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
