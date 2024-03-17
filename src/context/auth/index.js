import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "services/firebase-service";

// Create a context for the auth state
export const AuthContext = createContext();

// Create a provider for the auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ip, setIp] = useState(null); 
  const [ipFetched, setIpFetched] = useState(false);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (!ipFetched) {
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          setIp(data.ip);
          setIpFetched(true);
        });
    }
  }, [ipFetched]);


  return (
    <AuthContext.Provider value={{ user, ip }}>{children}</AuthContext.Provider>
  );
};
