import ReactLogo from "../../assets/react-router-svgrepo-com.svg";
import LoginForm from "../../components/LoginForm";
import PhoneAuth from "../../components/PhoneAuth";
import Accordion from "../../components/Accordion";
import GitHubLogin from "../../components/githubLogin";
import GoogleLogin from "../../components/googleLogin";

const LoginPage = () => {
  return (
    <div className="container mt-2 mb-5" id="LoginPage">
      <div className="row">
        <div className="col-sm-7">
          <h1 className="mb-3 fw-bold" style={{ fontSize: "3rem" }}>
            CHANGE THE WAY YOU FINANCE
          </h1>
          <div className="mb-5 w-75">
            <p className="text-muted fw-medium">
              For those who want more from their finances - there is Creditor. Sign up for free, in
              a tap.
            </p>
          </div>
          <h2 className="mb-4 ms-4">Login & Sign up below!</h2>
          <div className="w-75">
            <Accordion
              authMethod1={<LoginForm />}
              authMethod2={<PhoneAuth />}
              authMethod3={<GitHubLogin />}
              authMethod4={<GoogleLogin />}
            />
          </div>
        </div>
        <div className="col-sm-5 d-flex justify-content-center align-items-center">
          <div className="card border-0">
            <img
              className="img-fluid"
              src={ReactLogo}
              alt="..."
              style={{ objectFit: "cover", width: "20rem" }}
            />
            <div className="card-img-overlay">
              <h1 className="text-danger text-center fw-bold">Creditor</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
