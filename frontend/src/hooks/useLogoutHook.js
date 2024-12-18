import useAuthContext from "./useAuthContext";
import useWorkoutContext from "./useWorkoutContext";
import { AUTH_ACTIONS } from "../contexts/AuthContext";
import { ACTIONS } from "../contexts/WorkoutContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutContext();

  const logout = () => {
    // clear localstorage
    localStorage.removeItem("user");
    // clear global state
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    workoutDispatch({ type: ACTIONS.RESET_STATE });
  };

  return { logout };
};

export default useLogout;
