
import { useEffect, useState } from "react";
import { CardCommande } from "../../components/profil/CardCommande.jsx";



export const ProfileDemandes = () => {

   const [commandesPasses, setCommandesPasses] = useState([]);
   const [commandesRecues, setCommandesRecues] = useState([]);


   useEffect(() => {
      fetch(import.meta.env.VITE_BASE_URL_BACKEND+'/api/commandes/all', {
         method: 'GET',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
         }
      }).then(response => response.json())
         .then(data => {
            setCommandesPasses(data[0])
            setCommandesRecues(data[1])
         })
         .catch(error => {
            console.error(error);
         });
   }, []);



   return <>
      <h1>Mes demandes</h1>


      <h2>Commandes reçues</h2>

      <section className="container-commandes">
         {commandesRecues.map(commande => <CardCommande key={Math.floor(Math.random() * 100000)} commande={commande} setCommandes={setCommandesRecues} />)}
      </section>




      <h2 style={{marginTop: "80px"}}>Commandes passées</h2>

      <section className="container-commandes">
         {commandesPasses.map(commande => <CardCommande key={Math.floor(Math.random() * 100000)} commande={commande} finalisable={false} setCommandes={setCommandesPasses} />)}
      </section>

   </>;

}