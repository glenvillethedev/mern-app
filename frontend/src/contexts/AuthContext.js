import { createContext, useReducer, useEffect } from "react";

export const AUTH_ACTIONS = {
    LOGIN : "login",
    LOGOUT : "logout"
}

// create context
export const AuthContext = createContext();

// create reducer function
const authReducer = (prevState, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            return { ...prevState, user: action.payload};
        case AUTH_ACTIONS.LOGOUT:
            return { ...prevState, user: null};
    
        default:
            return prevState;
    }
}

// create context provider component
export const AuthContextProvider = ({children}) => {
    // create global state (useReducer)
    const [state, dispatch] = useReducer(authReducer, {
        user : null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            dispatch({type: AUTH_ACTIONS.LOGIN, payload: user});
        }
    }, []);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}