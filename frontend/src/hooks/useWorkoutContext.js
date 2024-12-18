import { useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";

const useWorkoutContext = () => {
    const context = useContext(WorkoutContext);

    if(!context){
        throw new Error("WorkoutContext must be used inside a WorkoutContext.Provider Component.");
    }

    return context;
}

export default useWorkoutContext;