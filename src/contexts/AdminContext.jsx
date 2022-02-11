import { createContext, useState, useContext, useCallback } from "react";

import { useAuth } from "./AuthContext";

import * as service from "../services/accounts";

export const AdminContext = createContext({});

export const useAdmin = () => {
  const contextValue = useContext(AdminContext);

  if (!contextValue) {
    throw new Error(
      "Error: not possible to use Provider Outside Admin Context"
    );
  }
  return contextValue;
};

export const AdminContextProvider = ({ children }) => {
  const [associado, setAssociado] = useState()
  const [globalMessage, setGlobalMessage] = useState('');

  const authContext = useAuth();

  const createDependentOnUser = useCallback(async (data, urlUserEdit) => {
    console.log(urlUserEdit);
      try {
        const addDependentResponse = await service.addDependent(
          data,
          urlUserEdit,
          authContext.token
        );
        alert(addDependentResponse.data.message);
      } catch (error) {
        await handleErrorOnDependent(error);
    }}, []);

    const handleErrorOnDependent = useCallback(async (error) => {
      setGlobalMessage(error.message);
    }, []);

  return (
    <AdminContext.Provider
      value={{
        associado,
        setAssociado,
        globalMessage,
        createDependentOnUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
