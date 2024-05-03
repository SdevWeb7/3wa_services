import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";
import { ErrorBoundary } from "../hooks/ErrorBoundary.jsx";
import { Footer } from "./Footer.jsx";
import Toaster from "./Toaster.jsx";


export const Layout = () => {

   return <>

      <Header/>

      <main className="main">
         <ErrorBoundary
            fallback={<h1 className={'not-found'}>
               Il y a eu une erreur</h1>}>
            <Outlet/>
         </ErrorBoundary>
      </main>


      <Footer/>

      <Toaster/>
   </>;

}