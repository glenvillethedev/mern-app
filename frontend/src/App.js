import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import useAuthContext from "./hooks/useAuthContext";

import SignUp from "./pages/Signup";
import LogIn from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LogIn /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
