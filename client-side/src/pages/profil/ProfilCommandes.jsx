
import { useEffect, useState } from "react";
import { CardCommande } from "../../components/profil/CardCommande.jsx";



export const ProfilCommandes = () => {

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
      <h1>Mes commandes</h1>


      <h2>Commandes reçues</h2>

      <section className="container-commandes">
         {commandesRecues && Object.keys(commandesRecues).length > 0 ? commandesRecues.map(commande => <CardCommande key={commande.id} commande={commande} setCommandes={setCommandesRecues} />) : <p>Vous n'avez pas de commandes reçues</p>}
      </section>




      <h2 style={{marginTop: "80px"}}>Commandes passées</h2>

      <section className="container-commandes">
         {commandesPasses && Object.keys(commandesPasses).length > 0 ? commandesPasses.map(commande => <CardCommande key={Math.floor(Math.random() * 100000)} commande={commande} finalisable={false} setCommandes={setCommandesPasses} />) : <p>Vous n'avez pas de commandes passées</p>}
      </section>

   </>;

}