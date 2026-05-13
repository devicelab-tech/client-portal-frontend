import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedToken = localStorage.getItem("token");


        if (storedToken) {
            setToken(storedToken);
        }

        setLoading(false);

    }, []);

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }


    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, authenticated: !!token }}>

            {!loading && children}

        </AuthContext.Provider>
    )
};

export function useAuth() {
    return useContext(AuthContext);
};