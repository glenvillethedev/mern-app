import { useState } from "react";
import useLogin from "../hooks/useLoginHook";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, emptyFields, isLoading, login } = useLogin();

  // handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
        autoFocus="autofocus"
        className={emptyFields?.includes("email") ? "error" : ""}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={emptyFields?.includes("password") ? "error" : ""}
      />
      <button type="submit" disabled={isLoading}>{isLoading ? "Logging in..." : "Log in"}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LogIn;