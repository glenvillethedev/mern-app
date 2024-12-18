import { useState } from "react";
import useSignup from "../hooks/useSignupHook";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, emptyFields, isLoading, signup} = useSignup();

  // handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
        autoFocus="autofocus"
        className={emptyFields && emptyFields.includes("email") ? "error" : ""}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={emptyFields && emptyFields.includes("password") ? "error" : ""}
      />
      <button type="submit" disabled={isLoading}>{ isLoading ? "Creating New User..." : "Sign Up" }</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;