import React, { createContext, useState, useEffect } from "react";
import "firebase/auth";
import { onAuthStateChanged } from "services/firebase-service";

// Create a context for the auth state
export const AuthContext = createContext();

// Create a provider for the auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(setUser);
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
