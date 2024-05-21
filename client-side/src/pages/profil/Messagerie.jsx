import { useEffect, useState } from "react";
import { CardMessage } from "../../components/profil/CardMessage.jsx";

export const Messagerie = () => {
   const [messages, setMessages] = useState([])


   useEffect(() => {
      fetch('http://localhost:3000/api/messagerie/all', {
         credentials: 'include'
      })
      .then(res => res.json())
      .then(data => setMessages(data))
   }, [])



   return <>

      <h1>Messagerie</h1>


      <section className="container-messages">

         {messages.map((message, index) => <CardMessage setMessages={setMessages} key={index} message={message} />)}

      </section>
   </>

}