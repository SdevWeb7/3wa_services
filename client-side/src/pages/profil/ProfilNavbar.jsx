import { Link } from "react-router-dom";

export const ProfilNavbar = () => {

   return <>
       <nav className={'profil-navbar'}>
           <Link to={'/profil'}>Profil</Link>
           <Link to={'/profil/mes-services'}>Services</Link>
           <Link to={'/profil/mes-demandes'}>Demandes</Link>
           <Link to={'/profil/messagerie'}>Messagerie</Link>

       </nav>
   </>

}