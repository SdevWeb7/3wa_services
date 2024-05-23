import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Layout } from "./pages/Layout.jsx";
import { Services } from "./pages/Services.jsx";
import { useContext, useEffect } from "react";
import { LayoutProfil } from "./pages/profil/LayoutProfil.jsx";
import { AuthForm } from "./pages/profil/AuthForm.jsx";
import { ProfileHome } from "./pages/profil/ProfileHome.jsx";
import { myContext } from "./hooks/MyContextProvider.jsx";
import { Messagerie } from "./pages/profil/Messagerie.jsx";
import { ProfileDemandes } from "./pages/profil/ProfileDemandes.jsx";
import { ProfileServices } from "./pages/profil/ProfileServices.jsx";


function App() {
   const {setUser} = useContext(myContext)

   useEffect(() => {
      fetch(import.meta.env.VITE_BASE_URL_BACKEND+'/api/auth/me', {
         headers: {
            'Accept': 'application/json'
         },
         credentials: 'include'
      })
            .then(r => r.json())
            .then(d => setUser(d))
   }, [])


   return <>
      <BrowserRouter>
         <Routes>
            <Route path={'/'} element={<Layout />}>
               <Route path={''} element={<Home />} />

               {/*AuthCheck and Profil*/}
               <Route path={'auth'} element={<AuthForm />} />
               <Route path={'profil'} element={<LayoutProfil />}>
                  <Route path={''} element={<ProfileHome />} />
                  <Route path={'mes-services'} element={<ProfileServices />} />
                  <Route path={'mes-demandes'} element={<ProfileDemandes />} />
                  <Route path={'messagerie'} element={<Messagerie />} />
               </Route>


               <Route path={'services'} element={<Services />} />


               <Route path={'*'} element={<h1>404 Not Found :(</h1>} />
            </Route>

         </Routes>
      </BrowserRouter>
   </>;
}

export default App;
