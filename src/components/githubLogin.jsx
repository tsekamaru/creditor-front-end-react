import { useContext } from "react";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { app } from "../firebase"; // ✅ Import Firebase config
import githubLogo from "../assets/github-color-svgrepo-com.svg";
import IdsContext from "../contexts/IdsContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GitHubLogin = () => {
  const auth = getAuth(app);
  const provider = new GithubAuthProvider();
  const { refreshIds } = useContext(IdsContext); // ✅ Moved inside component
  const navigate = useNavigate(); // ✅ Moved inside component

  const signInWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      toast.success("🦄 Logged in successfully!");
      refreshIds();
      navigate("/");
    } catch (error) {
      console.error("GitHub Sign-in Error:", error);
      toast.error("GitHub Sign-in failed!");
    }
  };

  return (
    <button className="btn btn-dark d-flex align-items-center m-2" onClick={signInWithGitHub}>
      <img src={githubLogo} alt="GitHub Logo" width="20px" className="me-2" />
      Sign in with GitHub
    </button>
  );
};

export default GitHubLogin;
