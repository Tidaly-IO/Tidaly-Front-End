import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedVariable, setSharedVariable] = useState(false);
  const [refreshName, setRefreshName] = useState(false);

  return (
    <AppContext.Provider value={{ sharedVariable, setSharedVariable, refreshName, setRefreshName }}>
      {children}
    </AppContext.Provider>
  );
};
