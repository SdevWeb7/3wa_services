import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Layout } from "./pages/Layout.jsx";
import { About } from "./pages/About.jsx";
import { useContext, useEffect } from "react";
import { LayoutProfil } from "./pages/profil/LayoutProfil.jsx";
import { AuthForm } from "./pages/profil/AuthForm.jsx";
import { ProfileHome } from "./pages/profil/ProfileHome.jsx";
import { myContext } from "./hooks/MyContextProvider.jsx";


function App() {
   const {setUser} = useContext(myContext)

   useEffect(() => {
      fetch('http://localhost:3000/api/me', {
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

               {/*AuthCheck and Auth*/}
               <Route path={'/auth'} element={<AuthForm />} />
               <Route path={'profil'} element={<LayoutProfil />}>
                  <Route path={''} element={<ProfileHome />} />
               </Route>


               <Route path={'about'} element={<About />} />


               <Route path={'*'} element={<h1>404 Not Found :(</h1>} />
            </Route>

         </Routes>
      </BrowserRouter>
   </>;
}

export default App;
