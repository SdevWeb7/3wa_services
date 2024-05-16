import { Outlet } from "react-router-dom";
import { Spinner } from "../../components/Spinner.jsx";
import { ProfilNavbar } from "./ProfilNavbar.jsx";
import { useContext } from "react";
import { myContext } from "../../hooks/MyContextProvider.jsx";

export const LayoutProfil = () => {
   const { user } = useContext(myContext);

   if (!user) return <Spinner />

   else if (Object.keys(user).length === 0) window.location.href = '/auth';


   else return <section className={'profil-layout'}>

         <ProfilNavbar/>


         <article className={"profil-content"}>
            <Outlet/>
         </article>


      </section>
}