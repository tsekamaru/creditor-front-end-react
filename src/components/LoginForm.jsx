import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e, actionType) => {
    e.preventDefault();

    if (actionType === "login") {
      console.log("Logging in with:", email, password);
      // Add login logic here (API call, validation, etc.)
    } else if (actionType === "signup") {
      console.log("Signing up with:", email, password);
      // Add sign-up logic here
    }
  };

  return (
    <form className="d-flex flex-column mt-2" onSubmit={handleFormSubmit}>
      <div className="form-floating mb-2">
        <input
          className="form-control"
          type="text"
          name="email"
          id="email"
          value={email ?? ""}
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
          value={password ?? ""}
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="form-label fw-semibold" htmlFor="password">
          Password:
        </label>
      </div>

      <button className="btn btn-dark d-block mb-2" onClick={(e) => handleFormSubmit(e, "login")}>
        Login
      </button>
      <button className="btn btn-danger d-block" onClick={(e) => handleFormSubmit(e, "signup")}>
        Sign up
      </button>
    </form>
  );
};

export default LoginForm;
