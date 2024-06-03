import { createPortal } from "react-dom";
import { IconClose } from "../../svg/IconClose.jsx";
import { useState } from "react";
import { useAppStore } from "../../utils/store.js";

export const SendMessageModal = ({setIsOpen, toUserId}) => {
   const addToast = useAppStore.use.addToast();
   const [formDatas, setFormDatas] = useState({
      subject: '',
      content: '',
      toUserId: toUserId
   });
   const isValidSubject = formDatas.subject.length > 5;
   const isValidContent = formDatas.subject.length > 5;


   const onInputChange = (e) => {
      setFormDatas({
         ...formDatas,
         [e.target.id]: e.target.value
      });
   }

   const handleSendMessage = async () => {
      if (!isValidSubject || !isValidContent) {
         addToast('error','Veuillez remplir correctement les champs');
         return;
      }
      try {
         const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/messagerie/send`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDatas)
         })
         const data = await response.json();

         if (data.err) {
            addToast('error','Erreur lors de l\'envoi du message');
         } else {
            addToast('success','Message envoyé');
            setIsOpen(false);
         }
      } catch (error) {
         addToast('error','Erreur lors de l\'envoi du message');
      }
   }


   return createPortal(<section onClick={() => setIsOpen(false)} className={'send-message-modal'}>


      <form onSubmit={e => e.preventDefault()}>
         <IconClose onClick={() => setIsOpen(false)}  />

         <label htmlFor="subject">Le Sujet du message</label>
         <input
            onChange={onInputChange}
            id={'subject'}
            type="text"
            placeholder={'Sujet du message'} />

         <label htmlFor="content">Votre message</label>
         <textarea
            onChange={onInputChange}
            placeholder={'Votre message'}
            name="content"
            id="content"></textarea>

         <button
            onClick={handleSendMessage}
            className="btn btn-tertiary">Envoyer le message</button>

      </form>

   </section>, document.body);

}