import { Outlet } from "react-router-dom";
import { useAppStore } from "../../utils/store.js";
import { Spinner } from "../../components/Spinner.jsx";

export const LayoutProfil = () => {
   const user = useAppStore.use.user();

   if (!user) return <Spinner />

   else if (Object.keys(user).length === 0) window.location.href = '/auth';


   else return <section className={'profil-layout'}>

         <div className="navbar-profil">
            bonjour
            bonjour
            bonjour
            bonjour
            bonjour
            bonjour
            bonjour
            bonjour
            bonjour
            bonjour
            bonjour
            bonjour
            <p>bonjour</p>
         </div>

       <Outlet />
   </section>

}