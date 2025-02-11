import { Routes, Route } from "react-router-dom";
import Navtab from "../../components/Navtab";
import AllTab from "../loan/AllTab";
import DetailsTab from "../loan/DetailsTab";
import AddTab from "../loan/AddTab";
import UpdateTab from "../loan/UpdateTab";

const LoansPage = () => {
  return (
    <div className="mb-5">
      <Navtab parentPage={"loans"} />
      <Routes>
        <Route path="all" element={<AllTab />} />
        <Route path="details/:loanId" element={<DetailsTab />} />
        <Route path="add" element={<AddTab />} />
        <Route path="update/:loanId" element={<UpdateTab />} />
      </Routes>
    </div>
  );
};

export default LoansPage;
