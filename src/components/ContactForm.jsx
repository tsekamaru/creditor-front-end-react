import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../firebase";
import errorHandler from "../utils/errorHandler";
import LoadingError from "../components/LoadingError";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null); // Reference to form element
  const navigate = useNavigate(); // Navigation hook
  const [validated, setValidated] = useState(false); // State to manage form validation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formRef.current.checkValidity()) {
      console.log("Form validated successfully!");
      setLoading(true);
      setValidated(false);

      try {
        await addDoc(collection(db, "contacts"), {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date(),
        });

        setFormData({ name: "", email: "", message: "" });
        toast.success("Message sent successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        setError(true);
        errorHandler(error);
      }
      setLoading(false);
    } else {
      setValidated(true); // Enable Bootstrap validation feedback
      console.log("Form is still invalid!");
    }
  };

  if (loading || error) return <LoadingError loading={loading} error={error} />;

  return (
    <div className="container my-4">
      {/* Go back button */}
      <button className="btn btn-outline-dark mb-3 fw-semibold" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i> Go Back
      </button>

      {/* Add Loan Form */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white fw-semibold">Send Message</div>
        <div className="card-body">
          <form
            ref={formRef}
            className={`d-flex flex-column container-fluid mt-2 needs-validation ${
              validated ? "was-validated" : ""
            }`}
            onSubmit={handleFormSubmit}
            noValidate
          >
            <div className="form-floating mb-2">
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="name">
                Name:
              </label>
              <div className="invalid-feedback">Please provide a name.</div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="email">
                Email:
              </label>
              <div className="invalid-feedback">Please provide a valid email.</div>
            </div>

            <div className="form-floating my-2">
              <input
                className="form-control"
                type="text"
                name="message"
                id="message"
                value={formData.message}
                placeholder=""
                onChange={handleChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="message">
                Message:
              </label>
              <div className="invalid-feedback">Please leave a message.</div>
            </div>

            <div className="my-2">
              <button className="btn btn-primary fw-semibold">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
