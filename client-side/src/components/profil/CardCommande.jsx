import { IconTrash } from "../../svg/IconTrash.jsx";
import { useAppStore } from "../../utils/store.js";

export const CardCommande = ({commande, setCommandes, finalisable = true}) => {
   const addToast = useAppStore.use.addToast();

   const handleDelete = async () => {
      try {
         const response = await fetch(`http://localhost:3000/api/commandes/delete/${commande.id}}}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
            }
         });
         const data = await response.json();
         if (data.err) {
            addToast('error', 'Il y a eu un problème.');
         } else {
            addToast('success', data.message);
            setCommandes((commandes) => commandes.filter((c) => c.id !== commande.id));
         }
      } catch (error) {
         addToast('error', 'Il y a eu un problème.');
      }

   }

   const handleFinaliser = async () => {
      try {
         const response = await fetch(`http://localhost:3000/api/commandes/finaliser/${commande.id}}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
            }
         });
         const data = await response.json();

         if (data.err) {
            addToast('error', 'Il y a eu un problème.');
         } else {
            addToast('success', data.message);
            setCommandes((commandes) => commandes.map((c) => {
               if (c.id === commande.id) {
                  return {...c, status: 'Finalisée'};
               }
               return c;

            }));
         }
      } catch (error) {
         addToast('error', 'Il y a eu un problème.');
      }

   }

   return <article className={'card-commande'}>

      <h3>{commande.title}</h3>
      <p><span>Le :</span> {new Date(commande.created_at).toLocaleDateString()}</p>
      <p><span>Par : </span>{commande.user_email}</p>
      <p><span>Pour le : </span>{new Date(commande.start_date).toLocaleDateString()}</p>

      <p><span>Status : </span>{commande.status}</p>

      <p><span>Détails : </span>{commande.description}</p>


      <div className={'commande-actions'}>
         {finalisable && <button
                              onClick={handleFinaliser}
                              className={'btn btn-secondary'}>Finaliser</button>}

         <button
            onClick={handleDelete}
            className="btn btn-danger"><IconTrash /></button>
      </div>
   </article>
}