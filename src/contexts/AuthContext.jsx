import { createContext, useState, useContext } from "react";

import { saveToLocalStorage, readFromLocalStorage } from "../utils/local";

export const AuthContext = createContext({});

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("Error: not possible to use Provider Outside Auth Context");
  }
  return contextValue;
};

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(readFromLocalStorage("token"));
  const [urlUser, setUrlUser] = useState(readFromLocalStorage("urlUser"));
  const [auth, setAuth] = useState(null);

  const handleLoginToken = (recivedData) => {
    const { auth, token, urlUser } = recivedData;
    saveToLocalStorage("token", token);
    saveToLocalStorage("urlUser", urlUser);
    setToken(token);
    setUrlUser(urlUser);
    setAuth(auth);
  };

  return (
    <AuthContext.Provider value={{ handleLoginToken, token, urlUser, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
