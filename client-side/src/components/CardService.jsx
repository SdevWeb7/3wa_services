import { SendMessageModal } from "./profil/SendMessageModal.jsx";
import { useContext, useRef, useState } from "react";
import { myContext } from "../hooks/MyContextProvider.jsx";
import { useAppStore } from "../utils/store.js";


export const CardService = ({service, setService}) => {
    const {user} = useContext(myContext);
    const [sendMessageModalIsOpen, setSendMessageModalIsOpen] = useState(false);
    const addToast = useAppStore.use.addToast()
    const dateRef = useRef(null);
    const imgSrc = service.img_src === 'http://via.placeholder.com/640x360' ? service.img_src : `${import.meta.env.VITE_BASE_URL_BACKEND}/img/${service.img_src}`;


    const handleOrder = async () => {
        if (!user || !user.email) {
            addToast('info', 'Vous devez être connecté pour commander un service.');
            return;
        }
        if (user.sold < service.cost) {
            addToast('info', 'Vous n\'avez pas assez de CommuniTokens pour commander ce service.');
            return;
        }
        if (!dateRef.current?.value) {
            addToast('info', 'Veuillez renseigner une date pour la commande.');
            return;
        }
        try {
            // Conversion de la date en format MySQL
            const dateObj = new Date(dateRef.current.value);
            const pad = (number) => number.toString().padStart(2, '0');
            const mysqlDateStr = `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())} ${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}:${pad(dateObj.getSeconds())}`;

            const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/commandes/add/${service.id}`, {
                method: 'POST',
                credentials: 'include',
                  headers: {
                     'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                     date: new Date(mysqlDateStr)
                  })
            })
            const data = await response.json();

            if (data.err) addToast('error', 'Il y a eu une erreur lors de la commande. Veuillez réessayer.');
            else addToast('success', 'Commande effectuée avec succès !');
        } catch (error) {
            addToast('error', 'Il y a eu une erreur lors de la commande. Veuillez réessayer.');
        }
    }

    const handleMessageModal = () => {
        if (user && user.email) {
            setSendMessageModalIsOpen(true);
        } else {
            addToast("info", "Vous devez être connecté pour contacter un utilisateur.");
        }
    }

    const reportService = async () => {
         try {
               const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/services/report/${service.id}`, {
                  method: 'PATCH',
                  credentials: 'include'
               })
               const data = await response.json();
               if (data.err) addToast('error', 'Il y a eu une erreur lors du signalement. Veuillez réessayer.');
               else {
                   addToast('success', 'Service signalé avec succès !');
                   setService(prevState => prevState.filter(s => s.id !== service.id));
               }
         } catch (error) {
               addToast('error', 'Il y a eu une erreur lors du signalement. Veuillez réessayer.');
         }
    }

   return <>
       <article
          key={service.id}
          className={'card'}>

           <p><span>Catégorie :</span> {service.category_name}</p>
           <h2>{service.title}</h2>

           <img
              src={imgSrc}
              width={230}
              alt={service.title} />

           <p style={{textAlign: 'center', marginBottom: "3rem"}}>{service.description}</p>

           <p><span>Durée : </span>{service.duration} heure(s)</p>
           <p><span>Coût :</span> {service.cost} CommuniTokens</p>


           <div className="service-buttons">
               <button
                  onClick={handleOrder}
                  className="btn btn-primary">Commander
               </button>

               <button
                  aria-haspopup={'dialog'}
                  onClick={handleMessageModal}
                  className="btn btn-secondary">Contacter
               </button>
           </div>

           <input
              ref={dateRef}
              id={"date-commande"}
              className={'input-date'}
              type="datetime-local" />
           <label
              className={'label-date'}
              htmlFor="date-commande">Sélectionnez une date</label>

           <div className="footer-card">
               <p><span>Par :</span> {service.pseudonyme}</p>
               <p><span>{service.services_rendered} service(s)</span> rendu(s).</p>

               <p><span>Le : </span>{new Date(service.created_at).toLocaleDateString()} à {new Date(service.created_at).toLocaleTimeString()}</p>
           </div>


           {sendMessageModalIsOpen && <SendMessageModal
              setIsOpen={setSendMessageModalIsOpen}
              toUserId={service.user_id} />}


           <button
              onClick={reportService}
              className={'warning'}>Signaler</button>
       </article>
   </>

}