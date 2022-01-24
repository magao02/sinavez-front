import { createContext, useState, useContext } from "react";

import {
  saveToLocalStorage,
  readFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/local";

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
  const [auth, setAuth] = useState(readFromLocalStorage("auth"));

  const handleLoginToken = (recivedData) => {
    const { auth, token, urlUser } = recivedData;
    saveToLocalStorage("token", token);
    saveToLocalStorage("urlUser", urlUser);
    saveToLocalStorage("auth", auth);
    setToken(token);
    setUrlUser(urlUser);
    setAuth(auth);
  };

  const cleanInfos = () => {
    removeFromLocalStorage("token");
    removeFromLocalStorage("urlUser");
    removeFromLocalStorage("auth");
    setToken(undefined);
    setUrlUser(undefined);
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ handleLoginToken, token, urlUser, auth, cleanInfos }}
    >
      {children}
    </AuthContext.Provider>
  );
};
