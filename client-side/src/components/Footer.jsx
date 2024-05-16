import { IconMoon } from "../svg/IconMoon.jsx";
import { IconSun } from "../svg/IconSun.jsx";
import { useContext } from "react";
import { myContext } from "../hooks/MyContextProvider.jsx";

export const Footer = () => {

   const { theme, setTheme } = useContext(myContext);

   return <>

       <footer className={'footer'}>

          <aside className={'theme'}>
             <button
                className={'btn btn-primary'}
                onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>Thème {theme === 'dark' ? 'Clair' : "Sombre"}</button>
             {theme === 'dark' ? <IconMoon /> : <IconSun />}
          </aside>

          <p className={'copyright'}>Steven pour le diplôme de la 3W Academy</p>
          <p>© 2024 - Tous droits réservés</p>

       </footer>
   </>

}