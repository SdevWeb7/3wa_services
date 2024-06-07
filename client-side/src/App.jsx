import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Layout } from "./pages/Layout.jsx";
import { Services } from "./pages/Services.jsx";
import { useContext, useEffect } from "react";
import { LayoutProfil } from "./pages/profil/LayoutProfil.jsx";
import { AuthForm } from "./pages/profil/AuthForm.jsx";
import { ProfilHome } from "./pages/profil/ProfilHome.jsx";
import { myContext } from "./hooks/MyContextProvider.jsx";
import { ProfilMessagerie } from "./pages/profil/ProfilMessagerie.jsx";
import { ProfilCommandes } from "./pages/profil/ProfilCommandes.jsx";
import { ProfilServices } from "./pages/profil/ProfilServices.jsx";
import { AdminDashboard } from "./pages/admin/AdminDashboard.jsx";


function App() {
   const {setUser} = useContext(myContext)

   useEffect(() => {
      fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/auth/me`, {
         credentials: 'include'
      }).then(r => r.json())
         .then(d => setUser(d))
         .catch(e => console.error(e))
   }, [])


   return <>
      <BrowserRouter>
         <Routes>
            <Route path={'/'} element={<Layout />}>
               <Route path={''} element={<Home />} />


               <Route path={'auth'} element={<AuthForm />} />
               <Route path={'profil'} element={<LayoutProfil />}>
                  <Route path={''} element={<ProfilHome />} />
                  <Route path={'mes-services'} element={<ProfilServices />} />
                  <Route path={'mes-commandes'} element={<ProfilCommandes />} />
                  <Route path={'messagerie'} element={<ProfilMessagerie />} />
               </Route>


               <Route path={'services'} element={<Services />} />

               <Route path={"/admin"} element={<AdminDashboard />} />


               <Route path={'*'} element={<h1>404 Not Found :(</h1>} />
            </Route>

         </Routes>
      </BrowserRouter>
   </>;
}

export default App;
