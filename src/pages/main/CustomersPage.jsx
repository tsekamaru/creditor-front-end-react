import { Routes, Route } from "react-router-dom";
import Navtab from "../../components/Navtab";
import AllTab from "../customer/AllTab";
import DetailsTab from "../customer/DetailsTab";
import AddTab from "../customer/AddTab";
import UpdateTab from "../customer/UpdateTab";

const CustomersPage = () => {
  return (
    <div>
      <Navtab parentPage={"customers"} />
      <Routes>
        <Route path="all" element={<AllTab />} />
        <Route path="details/:id" element={<DetailsTab />} />
        <Route path="add" element={<AddTab />} />
        <Route path="update/:id" element={<UpdateTab />} />
      </Routes>
    </div>
  );
};

export default CustomersPage;
