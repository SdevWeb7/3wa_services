import { IconTrash } from "../../svg/IconTrash.jsx";
import { useState } from "react";
import { SendMessageModal } from "./SendMessageModal.jsx";
import { useAppStore } from "../../utils/store.js";

export const CardMessage = ({message, setMessages}) => {
    const addToast = useAppStore.use.addToast();
    const [answMessageModalIsOpen, setAnswMessageModalIsOpen] = useState(false)


    const deleteMessage = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/messagerie/delete/${message.id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            const data = await response.json();

            if (data.err) {
                addToast('error', 'Erreur lors de la suppression du message');
            } else {
                addToast("success", 'Message supprimé');
                  setMessages(prevState => prevState.filter(mess => mess.id !== message.id))
            }
        } catch (error) {
            addToast('error', 'Erreur lors de la suppression du message');
        }
    }


   return <>
       <article className={'card-message'}>


           <p><span>Message de :</span> {message.sender_pseudonyme}</p>
           <p><span>Sujet : </span>{message.subject}</p>
           <p>{message.content}</p>

           <p>le {new Date(message.created_at).toLocaleDateString()} à {new Date(message.created_at).toLocaleTimeString()}</p>

           <div className="card-buttons">
               <button
                  onClick={() => setAnswMessageModalIsOpen(true)}
                  style={{padding: '1rem'}}
                  className="btn btn-primary">Répondre
               </button>

               <button
                  onClick={deleteMessage}
                  className="btn btn-danger"><IconTrash/></button>
           </div>



           {answMessageModalIsOpen && <SendMessageModal setIsOpen={setAnswMessageModalIsOpen} toUserId={message.sender_id} />}
       </article>
   </>

}