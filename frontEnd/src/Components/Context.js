import React, { createContext, useReducer } from "react";
import { reducer } from "../Components/Reducer";

export const GlobalContext = createContext("Initial Value");

let data = {
  user: {},
  isLogin: false,
  darkTheme: true,
  baseUrl: "https://eventapp-production-5dc4.up.railway.app",
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
