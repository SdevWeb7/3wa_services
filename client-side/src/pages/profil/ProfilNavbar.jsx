import { Link } from "react-router-dom";
import { useAppStore } from "../../utils/store.js";

export const ProfilNavbar = () => {
    const addToast = useAppStore.use.addToast();

    const handleLogout = async () => {
        const response = await fetch('http://127.0.0.1:3000/api/auth/logout');

        const result = await response.json();
        if (!result.err) {
            window.location.href = '/';
            addToast('success', result.message);
        } else addToast('error', result.message);
    }

   return <>
       <nav className={'profil-navbar'}>
           <Link to={'/profil'}>Profil</Link>
           <Link to={'/profil'}>Mes services</Link>
           <Link to={'/profil'}>Mes demandes</Link>
           <Link to={'/profil'}>Messagerie</Link>


           <button
              className={"btn btn-secondary logout-btn"}
              onClick={handleLogout}>Déconnexion
           </button>
       </nav>
   </>

}