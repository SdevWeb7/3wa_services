import { useEffect, useState } from "react";
import { AddServiceForm } from "../../components/profil/AddServiceForm.jsx";
import { IconTrash } from "../../svg/IconTrash.jsx";
import { useAppStore } from "../../utils/store.js";


export const ProfileServices = () => {
   const addToast = useAppStore.use.addToast();
   const [services, setServices] = useState([]);
   const [addFormIsOpen, setAddFormIsOpen] = useState(false);


   useEffect(() => {
      fetch('http://localhost:3000/api/services/user', {
         credentials: 'include'
      }).then(response => response.json())
        .then(result => setServices(result))
        .catch(err => console.log(err));
   }, []);


   const deleteService = async (id) => {
      if (confirm('Voulez-vous vraiment supprimer ce service ?') === false) return;
      const response = await fetch(`http://localhost:3000/api/services/delete/${id}`, {
         method: 'DELETE',
         credentials: 'include'
      });

      const result = await response.json();

      if (!result.err) {
         setServices(services.filter(service => service.id !== id));
         addToast('success', result.message);
      } else addToast('error', 'Il y a eu une erreur');
   }
   return <>
      <h1>Mes services</h1>

      <button
         className={'btn btn-secondary add-service-handler'}
         onClick={() => setAddFormIsOpen(!addFormIsOpen)}>
            {addFormIsOpen ? 'Fermer le formulaire' : 'Ajouter un service'}</button>


      {addFormIsOpen && <AddServiceForm setServices={setServices} />}



      <table>
         <thead>
            <tr>
               <th>Titre</th>
               <th>Catégorie</th>
               <th>Action</th>
            </tr>
         </thead>
         <tbody>
            {services.map(service => (
               <tr key={service.id}>
                  <td>{service.title}</td>
                  <td>{service.category}</td>
                  <td><button
                        onClick={() => deleteService(service.id)}
                        style={{padding: '3px'}}
                        className={'btn btn-danger'}><IconTrash /></button></td>
               </tr>
            ))}
         </tbody>
      </table>
   </>;

}