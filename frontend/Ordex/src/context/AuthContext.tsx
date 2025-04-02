import React, { createContext, useState, useContext } from "react";

// Define types (optional but recommended)
interface AuthContextType {
    token: string | null;
    setAuthToken: (token: string | null) => void;
}

// Create authentication context
const AuthContext = createContext<AuthContextType | null>(null); // ✅ FIXED: Added Type

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const setAuthToken = (newToken: string | null) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token"); // Clear token on logout
        }
    };

    return (
        <AuthContext.Provider value={{ token, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ FIXED: Use correct context with error handling
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
