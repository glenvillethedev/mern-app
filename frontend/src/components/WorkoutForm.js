import React from "react";
import { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";
import { ACTIONS, FORM_MODE } from "../contexts/WorkoutContext";

function WorkoutForm() {
  const { workoutData, formMode, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const modifyWorkout = (key, value) => {
    dispatch({ type: ACTIONS.MODIFY_WORKOUT, payload: { key, value}});
  }  

  const resetInput = () => {
    dispatch({ type: ACTIONS.CLEAR_WORKOUT });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if(!user){
      setError("Please login to add a new workout.");
      return;
    }

    try{
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/api/workout", {
        method: "POST",
        body: JSON.stringify({ title: workoutData.title, load: workoutData.load, reps: workoutData.reps }),
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${user.token}`
        },
      });
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.errMsg);
        setEmptyFields(json.emptyFields);
      } else {
        resetInput();
        setError("");
        setEmptyFields([]);
        dispatch({ type: ACTIONS.ADD_WORKOUT, payload: json});
      }
    }catch(error){
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if(!user){
      setError("Please login to add update an existing workout.");
      return;
    }

    try{
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/workout/${workoutData._id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: workoutData.title, load: workoutData.load, reps: workoutData.reps }),
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${user.token}`
        },
      });
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.errMsg);
        setEmptyFields(json.emptyFields);
      } else {
        resetInput();
        setError("");
        setEmptyFields([]);
        dispatch({ type: ACTIONS.UPDATE_WORKOUT, payload: json});
      }
    }catch(error){
      console.log(error);
    }
  };

  return (
    <form
      className="create"
      onSubmit={formMode === FORM_MODE.CREATE ? handleCreate : handleUpdate}
    >
      <h4>
        {formMode === FORM_MODE.CREATE
          ? "Add a New Workout"
          : "Update an Existing Workout"}
      </h4>
      <label htmlFor="workout-title">Title</label>
      <input
        id="workout-title"
        type="text"
        value={workoutData.title}
        onChange={(e) => modifyWorkout("title", e.target.value)}
        autoComplete="off"
        className={emptyFields?.includes("title") ? "error" : ""}
      />

      <label htmlFor="workout-load">Load (kg)</label>
      <input
        id="workout-load"
        type="number"
        value={workoutData.load}
        onChange={(e) => modifyWorkout("load", e.target.value)}
        className={emptyFields?.includes("load") ? "error" : ""}
      />

      <label htmlFor="workout-reps">Number of Reps</label>
      <input
        id="workout-reps"
        type="number"
        value={workoutData.reps}
        onChange={(e) => modifyWorkout("reps", e.target.value)}
        className={emptyFields?.includes("reps") ? "error" : ""}
      />

      {formMode === FORM_MODE.CREATE ? <button type="submit">Add Workout</button> : <button className="update-button" type="submit">Update Workout</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;