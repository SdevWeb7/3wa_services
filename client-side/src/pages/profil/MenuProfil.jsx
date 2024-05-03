import { Link } from "react-router-dom";

export const MenuProfil = () => {


   return <>
       <nav className={'navbar-profil'}>
           <Link to={'/profil'}>Home</Link>
       </nav>

   </>

}