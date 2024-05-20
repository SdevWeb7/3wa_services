import { useEffect, useState } from "react";
import { useAppStore } from "../../utils/store.js";


export const AddServiceForm = ({setServices}) => {

   const addToast = useAppStore.use.addToast();
    const [formData, setFormData] = useState({
         title: '',
         description: '',
         cost: '',
         duration: '',
         category: 'Informatique'
    });
    const [formValid, setFormValid] = useState(false);
    const titleIsValid = formData.title.length >= 5 && formData.title.length <= 50;
    const descriptionIsValid = formData.description.length >= 10 && formData.description.length <= 300;
    const costIsValid = Number(formData.cost) >= 100 && Number(formData.cost) <= 300;
    const durationIsValid = Number(formData.duration) >= 0.5 && Number(formData.duration) <= 7;


    useEffect(() => {
        if (titleIsValid && descriptionIsValid && costIsValid && durationIsValid) setFormValid(true);
        else setFormValid(false);
    }, [formData]);


    const handleInputChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/services/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(formData)
        }).then(response => response.json())
          .then(result => {
               if (result.err) addToast('error', result.err);
               else {
                  addToast('success', result.message);
                  setServices(services => [...services, result.service]);
               }
         }).catch(() => addToast('error', 'Il y a eu un problème'));
    }


   return <>

       <form className={'add-service-form'} onSubmit={handleSubmit}>
             <label htmlFor={'title'}>Titre</label>
             <input
                id={"title"}
                type="text"
                name="title"
                placeholder={"Titre du service"}
                onChange={handleInputChange} />
             {!titleIsValid && <span>Entre 5 et 30 caractères</span>}


             <label htmlFor={'description'}>Description</label>
             <textarea
                id={"description"}
                name="description"
                placeholder={"Description du service"}
                onChange={handleInputChange}></textarea>
           {!descriptionIsValid && <span>Entre 10 et 300 caractères</span>}


             <label htmlFor={'cost'}>Coût</label>
             <input
                id={"cost"}
                type="number"
                name="cost"
                placeholder={'Coût en communiToken'}
                onChange={handleInputChange} />
           {!costIsValid && <span>Entre 100 et 300 communiToken</span>}


             <label htmlFor={'duration'}>Durée (en heures)</label>
             <input
                id={"duration"}
                type="number"
                name="duration"
                placeholder={'exemple: 1.5 pour une heure et demie'}
                onChange={handleInputChange} />
           {!durationIsValid && <span>Entre une demi-heure et 7h</span>}


             <label htmlFor={'category'}>Catégorie</label>
             <select
                id={"category"}
                name="category"
                onChange={handleInputChange}>
                <option value="Informatique">Informatique</option>
                <option value="Cuisine">Cuisine</option>
                <option value="Ménage">Ménage</option>
                <option value="Jardinage">Jardinage</option>
                <option value="Bricolage">Bricolage</option>
                <option value="Cours particuliers">Cours particuliers</option>
                <option value="Autres">Autres</option>
             </select>


             <button
                disabled={!formValid}
                type="submit"
                className={`btn btn-primary ${!formValid ? 'disabled-btn' : ""}`}>Ajouter</button>
       </form>
   </>

}