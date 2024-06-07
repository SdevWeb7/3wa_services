import { useEffect, useState } from "react";
import { CardService } from "../components/CardService.jsx";

export const Services = () => {
   const [services, setServices] = useState([]);
   const [page, setPage] = useState(1);
   const [totalServices, setTotalServices] = useState(0);
   const [searchKey, setSearchKey] = useState('');
   const PER_PAGE = 5;
   const totalPages = Math.ceil(totalServices / PER_PAGE);

   useEffect(() => {
      fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/services/all?page=${page}&searchKey=${searchKey}`, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
         },
         credentials: 'include'
      })
         .then(res => res.json())
         .then(data => {
            setServices(data[0] || []);
            setTotalServices(data[1] || 0);
         })
         .catch(err => console.error(err));
   }, [page, searchKey]);


      return <>

         <h1>Tous les services</h1>

         <div className="searchInput">
            <label htmlFor="searchKey">Rechercher un service</label>
            <input
               id={'searchKey'}
               type="text"
               name={'searchKey'}
               placeholder={'Entrez un mot clé'}
               value={searchKey}
               onChange={e => setSearchKey(e.target.value)} />
         </div>

         {totalPages > 1 && <p style={{textAlign: 'center', marginBottom: '1rem'}}>Page {page} / {totalPages}</p>}

         <div className="pagination">

            {page > 1 && <button
               onClick={() => setPage(page - 1)}
               className="btn btn-primary">Précédent</button>}


            {page < totalPages && <button
               onClick={() => setPage(page + 1)}
               className="btn btn-primary">Suivant</button>}
         </div>


         <section className="container-services">

            {services && services.length > 0 ? services.map(service => {
               return <CardService
                           key={service.id}
                           service={service}
                           setService={setServices} />
            }) : <p>Aucun service pour le moment.</p>}

         </section>


      </>
}