import { useEffect, useState } from "react";

export const Services = () => {
   const [services, setServices] = useState([]);
   const [page, setPage] = useState(1);
   const [totalServices, setTotalServices] = useState(0);
   const PER_PAGE = 5;
   const totalPages = Math.ceil(totalServices / PER_PAGE);

   useEffect(() => {
      fetch(`http://localhost:3000/api/services/all?page=${page}`)
         .then(res => res.json())
         .then(data => {
            setServices(data[0])
            setTotalServices(data[1])
         })
         .catch(err => console.error(err));
   }, [page]);


   return <>

      <h1>Tous les services</h1>


      <p style={{textAlign: 'center', marginBottom: '1rem'}}>Page {page} / {totalPages}</p>
      <div className="pagination">

         {page > 1 && <button
            onClick={() => setPage(page - 1)}
            className="btn btn-primary">Précédent</button>}


         {page < totalPages && <button
            onClick={() => setPage(page + 1)}
            className="btn btn-primary">Suivant</button>}
      </div>



      <section className="container-services">


         {services.length > 0 ? services.map(service => <article
                                       key={service.id}
                                       className={'service'}>


            <p>{service.title}</p>

            <p>Ajouté le : {new Date(service.created_at).toLocaleDateString()} à {new Date(service.created_at).toLocaleTimeString()}</p>

         </article>) : <p>Aucun service</p>}

      </section>



   </>

}