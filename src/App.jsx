import { Routes, Route } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
// import ErrorPage from "./pages/main/ErrorPage";
import HomePage from "./pages/main/HomePage";
import CustomersPage from "./pages/main/CustomersPage";
import LoansPage from "./pages/main/LoansPage";
import AboutPage from "./pages/main/AboutPage";
import LoginPage from "./pages/main/LoginPage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/customers/*"
            element={
              <PrivateRoute>
                <CustomersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/loans/*"
            element={
              <PrivateRoute>
                <LoansPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <AboutPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<LoginPage />} />
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
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
