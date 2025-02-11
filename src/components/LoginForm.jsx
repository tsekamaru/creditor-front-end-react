import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { auth, db } from "../firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerUser(email, password) {
    try {
      // Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Save user data to Firestore (with uid as document ID)
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp(), // Firestore server timestamp
      });

      console.log("User registered and saved to Firestore:", user.uid);
      toast("🎈Now you can login!");
      toast("🎉Signed up successfully!");
      return user.uid;
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error(`Cannot sign up! ${error.message}`);
    }
  }

  async function loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      toast("🦄 Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error.message);
      toast.error(`Cannot login! ${error.message}`);
    }
  }

  return (
    <form className="d-flex flex-column mt-2">
      <div className="form-floating mb-2">
        <input
          className="form-control"
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="form-label fw-semibold" htmlFor="email">
          Email:
        </label>
      </div>

      <div className="form-floating my-2">
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="form-label fw-semibold" htmlFor="password">
          Password:
        </label>
      </div>

      <button
        type="button"
        className="btn btn-dark d-block mb-2 fw-medium"
        onClick={(e) => {
          e.preventDefault();
          loginUser(email, password);
        }}
      >
        Login
      </button>

      <button
        type="button"
        className="btn btn-danger d-block fw-medium"
        onClick={(e) => {
          e.preventDefault();
          registerUser(email, password);
        }}
      >
        Sign up
      </button>
    </form>
  );
};

export default LoginForm;
