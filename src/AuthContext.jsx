import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [profile, setProfile] = useState(() =>
    localStorage.getItem("username")
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("username", profile);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
