import { IconTrash } from "../../svg/IconTrash.jsx";

export const CardCommande = ({commande, finalisable = true}) => {


   // const handleDelete = () => {
   //    fetch('http://localhost:3000/api/commandes/delete', {
   //       method: 'POST',
   //       credentials: 'include',
   //       headers: {
   //          'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify({commandeId: commande.id})
   //    }).then(response => response.json())
   //       .then(data => {
   //          console.log(data);
   //       })
   //       .catch(error => {
   //          console.error(error);
   //       });
   // }
   //
   // const handleFinaliser = () => {
   //    fetch('http://localhost:3000/api/commandes/finaliser', {
   //       method: 'POST',
   //       credentials: 'include',
   //       headers: {
   //          'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify({commandeId: commande.id})
   //    }).then(response => response.json())
   //       .then(data => {
   //          console.log(data);
   //       })
   //       .catch(error => {
   //          console.error(error);
   //       });
   // }

   return <article className={'card-commande'}>

      <h3>{commande.title}</h3>
      <p><span>Le :</span> {new Date(commande.created_at).toLocaleDateString()}</p>
      <p><span>Par : </span>{commande.user_email}</p>
      <p><span>Pour le : </span>{new Date(commande.start_date).toLocaleDateString()}</p>

      <p><span>Status : </span>{commande.status}</p>

      <p><span>Détails : </span>{commande.description}</p>


      <div className={'commande-actions'}>
         {finalisable && <button
                              // onClick={handleFinaliser}
                              className={'btn btn-secondary'}>Finaliser</button>}

         <button
            // onClick={handleDelete}
            className="btn btn-danger"><IconTrash /></button>
      </div>
   </article>
}