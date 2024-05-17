
import { useContext } from "react";

import { myContext } from "../../hooks/MyContextProvider.jsx";


export const ProfileDemandes = () => {

   const { user } = useContext(myContext);





   return <>
      <h1>Mes demandes</h1>



   </>;

}