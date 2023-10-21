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

function toBool(value) {
  // if the value is false, "false", or anything else, it will be false
  return value === true || value === "true";
}

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(readFromLocalStorage("token"));
  const [urlUser, setUrlUser] = useState(readFromLocalStorage("urlUser"));
  const [auth, setAuth] = useState(readFromLocalStorage("auth"));
  const [admin, setAdmin] = useState(toBool(readFromLocalStorage("admin")));
  const [adminMaster, setAdminMaster] = useState(toBool(readFromLocalStorage("adminMaster")));
  const [dependent, setDependent] = useState();

  const handleLoginToken = (recivedData) => {
    const { auth, token, urlUser, admin, adminMaster } = recivedData;
    saveToLocalStorage("token", token);
    saveToLocalStorage("urlUser", urlUser);
    saveToLocalStorage("auth", auth);
    saveToLocalStorage("admin", admin);
    saveToLocalStorage("adminMaster", adminMaster);
    setToken(token);
    setUrlUser(urlUser);
    setAuth(auth);
    setAdmin(admin);
    setAdminMaster(adminMaster);
  };

  const cleanInfos = () => {
    removeFromLocalStorage("token");
    removeFromLocalStorage("urlUser");
    removeFromLocalStorage("auth");
    removeFromLocalStorage("admin");
    removeFromLocalStorage("adminMaster");
    setToken(undefined);
    setUrlUser(undefined);
    setAuth(false);
    setAdmin(false);
    setAdminMaster(false);
  };

  return (
    <AuthContext.Provider
      value={{
        handleLoginToken,
        token,
        urlUser,
        auth,
        admin,
        adminMaster,
        cleanInfos,
        dependent,
        setDependent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
