import { useTheme } from "../hooks/useTheme.jsx";

export const Footer = () => {

   const { theme, setTheme } = useTheme();

   return <>

       <footer className={'footer'}>

          <p className={'theme'}>Thème actuel : {theme}</p>
          <button
             onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>Changer de thème</button>

          <p className={'copyright'}>Steven pour le diplôme de la 3W Academy - © 2024 - Tous droits réservés</p>

       </footer>
   </>

}