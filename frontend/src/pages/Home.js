import { useEffect } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutContext from "../hooks/useWorkoutContext";
import { ACTIONS } from "../contexts/WorkoutContext";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const { workoutList, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkoutList = async () => {
      try{
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/api/workout", {
          headers : {
            "Authorization" : `Bearer ${user.token}`
          }
        });
        const json = await response.json();
  
        dispatch({ type: ACTIONS.SET_WORKOUT_LIST, payload: json.workoutList });
      }
      catch(error){
        console.log(error);
      }
    };

    if(user){
      fetchWorkoutList();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workoutList &&
          workoutList.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
