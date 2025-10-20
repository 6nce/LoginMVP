import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

//Context state used to identify permissions
export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState("");
    const [token, setToken] = useState("");

    return(
        <AuthContext.Provider value={{email, setEmail, isLoggedIn, setIsLoggedIn, role, setRole, token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);