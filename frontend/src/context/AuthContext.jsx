import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return(
        <AuthContext.Provider value={{email, setEmail, isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}