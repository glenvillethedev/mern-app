import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext";

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("AuthContext must be used inside a AuthContext.Provider Component.");
    }

    return context;
}

export default useAuthContext;