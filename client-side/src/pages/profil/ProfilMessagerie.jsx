import { useEffect, useState } from "react";
import { CardMessage } from "../../components/profil/CardMessage.jsx";

export const ProfilMessagerie = () => {
   const [messages, setMessages] = useState([])


   useEffect(() => {
      fetch(import.meta.env.VITE_BASE_URL_BACKEND+'/api/messagerie/all', {
         credentials: 'include'
      })
      .then(res => res.json())
      .then(data => setMessages(data))
   }, [])



   return <>

      <h1>Messagerie</h1>


      <section className="container-messages">

         {messages && messages.map((message, index) => <CardMessage setMessages={setMessages} key={index} message={message} />)}

      </section>
   </>

}