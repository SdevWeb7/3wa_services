import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.jsx";
import { ErrorBoundary } from "../hooks/ErrorBoundary.jsx";
import { Footer } from "../components/Footer.jsx";
import Toaster from "../components/Toaster.jsx";


export const Layout = () => {

   return <>

      <Header/>

      <main className="main">
         <ErrorBoundary
            fallback={<h1 className={'warning'}>
               Il y a eu une erreur</h1>}>
            <Outlet/>
         </ErrorBoundary>
      </main>


      <Footer/>

      <Toaster/>

   </>;
}
