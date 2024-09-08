import { ChangePasswordForm } from "../../components/profil/ChangePasswordForm.jsx";
import { useContext } from "react";
import { myContext } from "../../hooks/MyContextProvider.jsx";


export const ProfilHome = () => {
   const {user} = useContext(myContext);

   return <>
      <h1>Profil</h1>


      <p style={{textAlign: 'center'}}>Bienvenue sur votre profil <b>{user.email}</b>.</p>

      <p style={{textAlign: 'center'}}>Vous pouvez ici modifier votre mot de passe, vous déconnecter et supprimer votre compte.</p>
      <p style={{textAlign: 'center'}}>De plus vous pouvez naviguer dans le menu pour ajouter un service, voir vos commandes passées ou reçues et accéder a votre messagerie.</p>


      <h2 className={'solde'}>Solde : {user.sold} CommuniTokens</h2>


      <ChangePasswordForm />



   </>;

}