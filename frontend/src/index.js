import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { WorkoutContextProvider } from "./contexts/WorkoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
