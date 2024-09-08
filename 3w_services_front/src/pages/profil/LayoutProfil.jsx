import { Link, Outlet } from "react-router-dom";
import { Spinner } from "../../components/Spinner.jsx";
import { useContext } from "react";
import { myContext } from "../../hooks/MyContextProvider.jsx";
import { ErrorBoundary } from "../../hooks/ErrorBoundary.jsx";

export const LayoutProfil = () => {
   const { user } = useContext(myContext);

   if (!user) return <Spinner />

   else if (Object.keys(user).length === 0) window.location.href = '/auth';


   else return <section className={'profil-layout'}>

         <nav className={'profil-navbar'}>
            <Link to={'/profil/mes-services'}>Services</Link>
            <Link to={'/profil/mes-commandes'}>Commandes</Link>
            <Link to={'/profil/messagerie'}>Messagerie</Link>
         </nav>


         <article className={"profil-content"}>
            <ErrorBoundary fallback={<h1 className={'warning'}>Il y a eu une erreur</h1>}>
               <Outlet/>
            </ErrorBoundary>
         </article>


      </section>
}