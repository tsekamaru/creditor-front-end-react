import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/main/HomePage";
import CustomersPage from "./pages/main/CustomersPage";
import LoansPage from "./pages/main/LoansPage";
import AboutPage from "./pages/main/AboutPage";
import ErrorPage from "./pages/main/ErrorPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers/*" element={<CustomersPage />} />
        <Route path="/loans/*" element={<LoansPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
