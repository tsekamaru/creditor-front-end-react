import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const HomePage = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="container mt-2" id="homePage">
      HOME PAGE!
      <h1>Welcome to Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
