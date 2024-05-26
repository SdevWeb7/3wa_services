import { SendMessageModal } from "./profil/SendMessageModal.jsx";
import { useContext, useRef, useState } from "react";
import { myContext } from "../hooks/MyContextProvider.jsx";
import { useAppStore } from "../utils/store.js";


export const CardService = ({service}) => {
    const {user} = useContext(myContext);
    const [sendMessageModalIsOpen, setSendMessageModalIsOpen] = useState(false);
    const addToast = useAppStore.use.addToast()
    const dateRef = useRef(null);
    const imgSrc = service.img_src.length > 0 ? `${import.meta.env.VITE_BASE_URL_BACKEND}/img/${service.img_src}` : 'http://via.placeholder.com/240x150';

    console.log(service);
    const handleMessageModal = () => {
        if (user && user.email) {
            setSendMessageModalIsOpen(true);
        } else {
            addToast("info", "Vous devez être connecté pour contacter un utilisateur.");
        }
    }

    const handleOrder = async () => {
        if (!user || !user.email) {
            addToast('info', 'Vous devez être connecté pour commander un service.');
            return;
        }
        if (!dateRef.current.value) {
            addToast('info', 'Veuillez renseigner une date pour la commande.');
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/commandes/add/${service.id}/${service.user_id}`, {
                method: 'POST',
                credentials: 'include',
                  headers: {
                     'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                     date: new Date(dateRef.current.value)
                  })
            })
            const data = await response.json();

            if (data.err) {
                addToast('error', 'Il y a eu une erreur lors de la commande. Veuillez réessayer.');
            } else {
                addToast('success', 'Commande effectuée avec succès !');
            }
        } catch (error) {
            addToast('error', 'Il y a eu une erreur lors de la commande. Veuillez réessayer.');
        }
    }


   return <>
       <article
          key={service.id}
          className={'service'}>

           <p><span>Catégorie :</span> {service.category}</p>
           <h2>{service.title}</h2>

           <img
              src={imgSrc}
              width={230}
              alt={service.title}/>

           <p style={{textAlign: 'center', marginBottom: "3rem"}}>{service.description}</p>

           <p><span>Durée : </span>{service.duration} heure(s)</p>
           <p><span>Coût :</span> {service.cost} CommuniTokens</p>


           <div className="service-buttons">
               <button
                  onClick={handleOrder}
                  className="btn btn-primary">Commander
               </button>

               <button
                  onClick={handleMessageModal}
                  className="btn btn-secondary">Contacter
               </button>
           </div>
           <input className={'input-date'} ref={dateRef} type="datetime-local"/>


           <div className="footer-card">
               <p><span>Ajouté par :</span> {service.email} qui a déjà
                   rendu {service.services_rendered} service(s).</p>

               <p>
                   <span>Le : </span>{new Date(service.created_at).toLocaleDateString()} à {new Date(service.created_at).toLocaleTimeString()}
               </p>
           </div>


           {sendMessageModalIsOpen && <SendMessageModal
              setIsOpen={setSendMessageModalIsOpen}
              toUserId={service.user_id}/>}


       </article>
   </>

}