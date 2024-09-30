import React from "react";
import useToken from "../hooks/useToken";
import axios from "axios";

// Context for the AuthProvider
const AuthProvider = React.createContext<{
  token: string | null;
  setToken: (token: string | null) => void;
}>({
  token: null,
  setToken: () => {},
});

// Component Wrapper so that token is never manually set
export function Auth({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useToken();

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  }

  return (
    <AuthProvider.Provider value={{ token, setToken }}>
      {children}
    </AuthProvider.Provider>
  );
}

// Context hook for easy access to the token
export function useAuth() {
  const context = React.useContext(AuthProvider);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
