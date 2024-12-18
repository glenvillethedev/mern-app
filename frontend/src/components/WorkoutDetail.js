import React from 'react'
import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from '../hooks/useAuthContext';
import { ACTIONS, FORM_MODE } from '../contexts/WorkoutContext';
import { formatDistanceToNow } from "date-fns";

function WorkoutDetail({ workout }) {
  const { formMode, workoutData, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if(!user){
      return;
    }

    // api call
    try {
      if(!window.confirm(`Are you sure you want to delete "${workout.title}"?`)){
        return;
      }
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/api/workout/${workout._id}`, {
        method : "DELETE",
        headers : {
          "Authorization" : `Bearer ${user.token}`
        }
      });
      if(response.ok){
        const json = await response.json();
        // dispatch call
        dispatch({ type: ACTIONS.CLEAR_WORKOUT });
        dispatch({type: ACTIONS.DELETE_WORKOUT, payload: json});
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toggleUpdateMode = () => {
    if(formMode === FORM_MODE.CREATE || (workoutData._id && workoutData._id !== workout._id )){
      dispatch({ type: ACTIONS.SET_WORKOUT, payload : workout  })
    }
    else {
      dispatch({ type: ACTIONS.CLEAR_WORKOUT });
    }
  }

  return (
    <div className={workoutData._id && workoutData._id === workout._id ? "workout-details workout-selected" : "workout-details"}>
      <h4 className={workoutData._id && workoutData._id === workout._id ? "selected" : ""}>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      { workoutData._id && workoutData._id === workout._id && workout && formMode !== FORM_MODE.CREATE ? (
        <span className="material-symbols-outlined edit-btn" onClick={toggleUpdateMode}>close</span>
      ) : (
        <span className="material-symbols-outlined edit-btn" onClick={toggleUpdateMode}>edit</span>
      )}
      <span className="material-symbols-outlined delete-btn" onClick={handleDelete}>delete</span>
    </div>
  );
}

export default WorkoutDetail