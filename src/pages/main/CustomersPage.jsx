import { Routes, Route } from "react-router-dom";
import Navtab from "../../components/Navtab";
import CustomersAllTab from "../customer/CustomersAllTab";
import CustomerDetailsTab from "../customer/CustomerDetailsTab";
import AddCustomerTab from "../customer/AddCustomerTab";
import UpdateCustomerTab from "../customer/UpdateCustomerTab";

const CustomersPage = () => {
  return (
    <div>
      <Navtab parentPage={"customers"} />
      <Routes>
        <Route path="all" element={<CustomersAllTab />} />
        <Route path="details" element={<CustomerDetailsTab />} />
        <Route path="add" element={<AddCustomerTab />} />
        <Route path="update" element={<UpdateCustomerTab />} />
      </Routes>
    </div>
  );
};

export default CustomersPage;
