import { createContext, useState, useContext } from "react";

export const AdminContext = createContext({});

export const useAdmin = () => {
  const contextValue = useContext(AdminContext);

  if (!contextValue) {
    throw new Error("Error: not possible to use Provider Outside Admin Context");
  }
  return contextValue;
};

export const AdminContextProvider = ({ children }) => {
  const [associado, setAssociado] = useState();

  return (
    <AdminContext.Provider
      value={{ associado, setAssociado}}
    >
      {children}
    </AdminContext.Provider>
  );
};
