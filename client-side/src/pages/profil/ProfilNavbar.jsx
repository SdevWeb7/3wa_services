import { Link } from "react-router-dom";

export const ProfilNavbar = () => {

   return <>
       <nav className={'profil-navbar'}>
           <Link to={'/profil'}>Profil</Link>
           <Link to={'/profil'}>Services</Link>
           <Link to={'/profil'}>Demandes</Link>
           <Link to={'/profil'}>Messagerie</Link>


       </nav>
   </>

}