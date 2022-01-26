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
  const [admin, setAdmin] = useState(readFromLocalStorage("admin"));
  const [dependent, setDependent] = useState();

  const handleLoginToken = (recivedData) => {
    const { auth, token, urlUser, admin } = recivedData;
    saveToLocalStorage("token", token);
    saveToLocalStorage("urlUser", urlUser);
    saveToLocalStorage("auth", auth);
    saveToLocalStorage("admin", admin);
    setToken(token);
    setUrlUser(urlUser);
    setAuth(auth);
    setAdmin(admin);
  };

  const cleanInfos = () => {
    removeFromLocalStorage("token");
    removeFromLocalStorage("urlUser");
    removeFromLocalStorage("auth");
    removeFromLocalStorage("admin");
    setToken(undefined);
    setUrlUser(undefined);
    setAuth(false);
    setAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        handleLoginToken,
        token,
        urlUser,
        auth,
        admin,
        cleanInfos,
        dependent,
        setDependent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
