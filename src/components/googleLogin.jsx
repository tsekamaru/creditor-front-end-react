import { useContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase"; // ✅ Import Firebase config
import googleLogo from "../assets/google-color-svgrepo-com.svg";
import IdsContext from "../contexts/IdsContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { refreshIds } = useContext(IdsContext); // ✅ Moved inside component
  const navigate = useNavigate(); // ✅ Moved inside component

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      toast.success("🦄 Logged in successfully!");
      refreshIds();
      navigate("/");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      toast.error("Google Sign-in failed!");
    }
  };

  return (
    <button className="btn btn-light d-flex align-items-center m-2" onClick={signInWithGoogle}>
      <img src={googleLogo} alt="Google Logo" width="20px" className="me-2" />
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
