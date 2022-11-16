import React, { createContext, useReducer } from 'react'
import { reducer } from '../Components/Reducer';



export const GlobalContext = createContext("Initial Value");


let data = {
    user: {},
    // addCarts: JSON.parse(localStorage.getItem("cartItem"))||[],
    isLogin: false,
    darkTheme: true,
    baseUrl: (window.location.href.indexOf("https") === -1) ? "http://localhost:3000" : "https://ecommerce-crud-production.up.railway.app"
}


export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data)
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}