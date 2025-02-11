import { useState, useEffect, useContext } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from "../firebase"; // ✅ Import Firebase config
import IdsContext from "../contexts/IdsContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const { refreshIds } = useContext(IdsContext);
  const navigate = useNavigate();

  // ✅ Setup reCAPTCHA on component mount (only once)
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA solved!");
        },
      });
      window.recaptchaVerifier.render();
    }
  }, []);

  // ✅ Send OTP after reCAPTCHA verification
  const sendOTP = async () => {
    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
      console.log("OTP Sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // ✅ Verify OTP
  const verifyOTP = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      console.log("User signed in:", result.user);
      setOtp(""); // ✅ Clear OTP field
      toast.success("🦄 Logged in successfully!");
      navigate("/");
      refreshIds();
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="container">
      <div id="recaptcha-container"></div> {/* ✅ Ensure this exists */}
      <div className="my-2 input-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter phone number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="btn btn-dark" onClick={sendOTP}>
          Send OTP
        </button>
      </div>
      <div className="my-2 input-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="btn btn-danger" onClick={verifyOTP}>
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default PhoneAuth;
