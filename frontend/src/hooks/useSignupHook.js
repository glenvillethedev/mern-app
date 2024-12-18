import { useState } from "react";
import { AUTH_ACTIONS } from "../contexts/AuthContext";
import useAuthContext from "../hooks/useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setError(null);
    setEmptyFields([]);
    setIsLoading(true);

    try {
      // send data to backend
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/api/user/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.errMsg);
        setEmptyFields(json.emptyFields);
      } else {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload: json });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { error, emptyFields, isLoading, signup };
};

export default useSignup;
