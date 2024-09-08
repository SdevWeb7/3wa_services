import { createContext, useState } from "react";
import { useTheme } from "./useTheme.jsx";


export const myContext = createContext({
   user: {},
   setUser: () => null,
   theme: '',
   setTheme: () => null,
});

export const MyContextProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const {theme, setTheme} = useTheme();


   return <myContext.Provider value={{user, setUser, theme, setTheme}}>

      {children}

   </myContext.Provider>
}