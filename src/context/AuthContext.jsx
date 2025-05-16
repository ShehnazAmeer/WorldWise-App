import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();


const initialState = {
   userDetails:{}

}

const ACTIONS = {
    login: 'app/login',
    logout:'app/logout',
    isAuthenticated:false,
    
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.getEmail:
            return (
                {
                    ...state,
                    userDetails:action.payload,
                }
            );
        
        case ACTIONS.getPasswod:
            return (
                {
                    ...state,
                    password:action.payload,
                }
            )

        default:
            return state;
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { userDetails } = state;

    function login(email, password) {
        const newUser = { email, password };
        dispatch({ type: ACTIONS.login, payload: newUser });
    }





    return (
        <AuthContext.Provider value={{
            login,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthentication() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('Auth provider used outside of its context');
    return context;
}
