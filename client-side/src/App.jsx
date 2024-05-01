import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Layout } from "./components/Layout.jsx";
import { About } from "./pages/About.jsx";


function App() {


   return <>
      <BrowserRouter>
         <Routes>
            <Route path={'/'} element={<Layout />}>
               <Route path={''} element={<Home />} />
               <Route path={'about'} element={<About />} />
            </Route>

         </Routes>
      </BrowserRouter>
   </>;
}

export default App;
