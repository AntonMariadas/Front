import { createContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    authToken: "",
    user: {},
});

export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const [user, setUser] = useState({});

    const context = { isAuthenticated, setIsAuthenticated, user, setUser, authToken, setAuthToken };

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthContext;
