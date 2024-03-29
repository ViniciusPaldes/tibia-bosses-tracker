import React, { createContext, useState } from "react";

export const ListOptionsContext = createContext();

const defaultValue = [
  {
    name: "Cidade",
    selected: true,
  },
  {
    name: "Todos",
    selected: false,
  },
];

export const ListOptionsProvider = ({ children }) => {
  const [listMode, setListMode] = useState(defaultValue);

  return (
    <ListOptionsContext.Provider value={{ listMode, setListMode }}>
      {children}
    </ListOptionsContext.Provider>
  );
};


