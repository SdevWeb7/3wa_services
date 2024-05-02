import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Layout } from "./components/Layout.jsx";
import { About } from "./pages/About.jsx";
import { AuthForm } from "./pages/AuthForm.jsx";
import { useAppStore } from "./utils/store.js";
import { useEffect } from "react";


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
               <Route path={'auth'} element={<AuthForm />} />
               <Route path={'about'} element={<About />} />
               <Route path={'*'} element={<h1>404</h1>} />
            </Route>

         </Routes>
      </BrowserRouter>
   </>;
}

export default App;
