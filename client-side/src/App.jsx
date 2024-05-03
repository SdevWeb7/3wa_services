import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Layout } from "./pages/Layout.jsx";
import { About } from "./pages/About.jsx";
import { useAppStore } from "./utils/store.js";
import { useEffect } from "react";
import { LayoutProfil } from "./pages/profil/LayoutProfil.jsx";
import { AuthForm } from "./pages/profil/AuthForm.jsx";
import { ProfileHome } from "./pages/profil/ProfileHome.jsx";


function App() {
   const updateUser = useAppStore.use.updateUser()

   useEffect(() => {
      fetch('http://127.0.0.1:3000/api/me')
            .then(r => r.json())
            .then(d => updateUser(d))
   }, [])

   return <>
      <BrowserRouter>
         <Routes>
            <Route path={'/'} element={<Layout />}>
               <Route path={''} element={<Home />} />

               {/*AuthCheck and Auth*/}
               <Route path={'/auth'} element={<AuthForm />} />
               <Route path={'profil'} element={<LayoutProfil />}>
                  <Route path={''} element={<ProfileHome />} />
               </Route>


               <Route path={'about'} element={<About />} />


               <Route path={'*'} element={<h1>404</h1>} />
            </Route>

         </Routes>
      </BrowserRouter>
   </>;
}

export default App;
