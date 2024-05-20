import { useEffect, useState } from "react";

export const Services = () => {
   const [services, setServices] = useState([]);

   useEffect(() => {
      fetch('http://localhost:3000/api/services/all')
         .then(res => res.json())
         .then(data => setServices(data))
         .catch(err => console.error(err));
   }, []);

   return <>

      <h1>Tous les services</h1>


      <section className="container-services">


         {services.map(service => <article
                                       key={service.id}
                                       className={'service'}>


            {service.title}

         </article>)}

      </section>
   </>

}