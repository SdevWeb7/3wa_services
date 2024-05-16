import { createContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";


export const myContext = createContext({
   user: {},
   setUser: () => null,
   theme: '',
   setTheme: () => null,
});

export const MyContextProvider = ({children}) => {
   const [user, setUser] = useState(null)
   const [theme, setTheme] = useLocalStorage('dark',
            window.matchMedia("(prefers-color-scheme: dark)")
                  .matches ? 'dark' : 'light')

   useEffect(() => {
      document.body.setAttribute('data-theme', theme)
   }, [theme])


   return <myContext.Provider value={{user, setUser, theme, setTheme}}>

      {children}

   </myContext.Provider>
}