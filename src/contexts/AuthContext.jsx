import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"; // Ensure correct Firebase import
import { toast } from "react-toastify";
import LoadingError from "../components/LoadingError";

// Create Authentication Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores authenticated user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Logout function
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    toast("🏝️Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
      {loading && <LoadingError loading={loading} error={false} />}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
