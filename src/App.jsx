import { Routes, Route } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

      {/* Global Toast Container (Always Available) */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        closeOnClick={true}
        theme="colored"
        transition={Slide}
        newestOnTop={true}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default App;
