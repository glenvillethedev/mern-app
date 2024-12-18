import { createContext, useReducer } from "react";

// createContext
export const WorkoutContext = createContext();

export const ACTIONS = {
  SET_WORKOUT_LIST: "set_workout_list",
  ADD_WORKOUT: "add_workout",
  UPDATE_WORKOUT: "update_workout",
  DELETE_WORKOUT: "delete_workout",
  MODIFY_WORKOUT: "modify_workout",
  SET_WORKOUT: "set_workout",
  CLEAR_WORKOUT: "clear_workout",
  RESET_STATE: "reset_state"
};

export const FORM_MODE = {
  CREATE: "create",
  UPDATE: "update",
}

// reducer function. handles state changes based on action {type, payload} object from dispatch function
const workoutReducer = (prevState, action) => {
  switch (action.type) {
    case ACTIONS.SET_WORKOUT_LIST:
      return { ...prevState, workoutList: action.payload };
    case ACTIONS.ADD_WORKOUT:
      return {
        ...prevState,
        workoutList: [action.payload, ...prevState.workoutList],
      };
    case ACTIONS.UPDATE_WORKOUT:
      return {
        ...prevState,
        workoutList: prevState.workoutList.map((workout) => {
          if (workout._id === action.payload._id) {
            return action.payload
          } else {
            return workout;
          }
        }),
      };
    case ACTIONS.DELETE_WORKOUT:
      return {
        ...prevState,
        workoutList: prevState.workoutList.filter(
          (workout) => workout._id !== action.payload._id
        )
      };
    case ACTIONS.MODIFY_WORKOUT:
      let newWorkoutData = {
        ...prevState.workoutData,
      };
      newWorkoutData[action.payload.key] = action.payload.value;

      return {
        ...prevState,
        workoutData: newWorkoutData,
      };
    case ACTIONS.SET_WORKOUT:
      return { ...prevState, workoutData: action.payload, formMode: FORM_MODE.UPDATE };
    case ACTIONS.CLEAR_WORKOUT:
      return { ...prevState, workoutData: { title: "", load: "", reps: "" }, formMode: FORM_MODE.CREATE };
    case ACTIONS.RESET_STATE:
      return { ...prevState, workoutList: null, workoutData: { title: "", load: "", reps: "" }, formMode: FORM_MODE.CREATE };
    default:
      return prevState;
  }
};

// Context Provider Wrapper Component
export const WorkoutContextProvider = ({ children }) => {
  // global state & dispatch function
  const [state, dispatch] = useReducer(workoutReducer, {
    workoutList: null,
    formMode : FORM_MODE.CREATE,
    workoutData: {
      title : "",
      load : "",
      reps : ""
    }
  });

  return (
    // pass state and dispatch to children using value prop of Provider
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
