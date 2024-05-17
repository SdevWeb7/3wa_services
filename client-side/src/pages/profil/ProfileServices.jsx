
import { useContext } from "react";

import { myContext } from "../../hooks/MyContextProvider.jsx";


export const ProfileServices = () => {

   const { user } = useContext(myContext);





   return <>
      <h1>Mes services</h1>


      
   </>;

}