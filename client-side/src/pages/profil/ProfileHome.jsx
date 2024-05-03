import { useAppStore } from "../../utils/store.js";

export const ProfileHome = () => {
   const addToast = useAppStore.use.addToast();

   const handleLogout = async () => {
      const response = await fetch('http://127.0.0.1:3000/api/auth/logout');

      const result = await response.json();
      if (!result.err) {
         window.location.href = '/';
         addToast('success', result.message);
      } else addToast('error', result.message);
   }

   return <>

      <h1>Profile Home</h1>


      <p style={{textAlign: 'center'}}>Bienvenue sur votre profil.</p>

      <p style={{textAlign: 'center'}}>Vous pouvez ici modifier vos informations personnelles, proposer ou gérer vos
         services en cours.</p>


      <button
         className={"btn btn-secondary logout-btn"}
         onClick={handleLogout}>Se déconnecter
      </button>

   </>

}