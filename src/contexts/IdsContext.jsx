import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create Context
const IdsContext = createContext();

// Context Provider Component
export const IdsProvider = ({ children }) => {
  const [ids, setIds] = useState({ customerId: "1", loanId: "1" });

  return <IdsContext.Provider value={{ ids, setIds }}>{children}</IdsContext.Provider>;
};
IdsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdsContext;
