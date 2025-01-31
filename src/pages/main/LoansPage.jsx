import { Routes, Route } from "react-router-dom";
import Navtab from "../../components/Navtab";
import LoansAllTab from "../loan/LoansAllTab";
import LoanDetailsTab from "../loan/LoanDetailsTab";
import AddLoanTab from "../loan/AddLoanTab";
import UpdateLoanTab from "../loan/UpdateLoanTab";

const LoansPage = () => {
  return (
    <div>
      <Navtab parentPage={"loans"} />
      <Routes>
        <Route path="all" element={<LoansAllTab />} />
        <Route path="details" element={<LoanDetailsTab />} />
        <Route path="add" element={<AddLoanTab />} />
        <Route path="update" element={<UpdateLoanTab />} />
      </Routes>
    </div>
  );
};

export default LoansPage;
