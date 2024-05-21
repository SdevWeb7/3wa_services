import { SendMessageModal } from "./profil/SendMessageModal.jsx";
import { useContext, useState } from "react";
import { myContext } from "../hooks/MyContextProvider.jsx";
import { useAppStore } from "../utils/store.js";


export const CardService = ({service}) => {
    const {user} = useContext(myContext);
    const [sendMessageModalIsOpen, setSendMessageModalIsOpen] = useState(false);
    const addToast = useAppStore.use.addToast()


    const handleMessageModal = () => {
        if (user && user.email) {
            setSendMessageModalIsOpen(true);
        } else {
            addToast("info", "Vous devez être connecté pour contacter un utilisateur.");
        }
    }

   return <>
       <article
          key={service.id}
          className={'service'}>

           <p><span>Catégorie :</span> {service.category}</p>
           <h2>{service.title}</h2>

           <p style={{textAlign: 'center', marginBottom: "3rem"}}>{service.description}</p>

           <p><span>Durée : </span>{service.duration} heure(s)</p>
           <p><span>Coût :</span> {service.cost} CommuniTokens</p>


           <div className="service-buttons">
               <button className="btn btn-primary">Commander</button>

               <button
                  onClick={handleMessageModal}
                  className="btn btn-secondary">Contacter
               </button>
           </div>


           <div className="footer-card">
               <p><span>Ajouté par :</span> {service.email} qui a déjà
                   rendu {service.services_rendered} service(s).</p>

               <p>
                   <span>Le : </span>{new Date(service.created_at).toLocaleDateString()} à {new Date(service.created_at).toLocaleTimeString()}
               </p>
           </div>


           {sendMessageModalIsOpen && <SendMessageModal
                                          setIsOpen={setSendMessageModalIsOpen}
                                          toUserId={service.user_id} />}


       </article>
   </>

}