import { ChangePasswordForm } from "../../components/profil/ChangePasswordForm.jsx";
import { useContext } from "react";
import { myContext } from "../../hooks/MyContextProvider.jsx";


export const ProfilHome = () => {
   const {user} = useContext(myContext);

   return <>
      <h1>Profil</h1>


      <p style={{textAlign: 'center'}}>Bienvenue sur votre profil <b>{user.email}</b>.</p>

      <p style={{textAlign: 'center'}}>Vous pouvez ici modifier vos informations personnelles.</p>


      <h2>Solde : {user.sold} CommuniTokens</h2>


      <ChangePasswordForm />



   </>;

}