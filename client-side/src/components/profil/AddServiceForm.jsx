import { useEffect, useState } from "react";
import { useAppStore } from "../../utils/store.js";


export const AddServiceForm = ({setServices, categories = []}) => {

    const addToast = useAppStore.use.addToast();
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
         title: '',
         description: '',
         cost: '',
         duration: '',
         categoryId: 1
    });
    const [formValid, setFormValid] = useState(false);
    const titleIsValid = formData.title.length >= 5 && formData.title.length <= 50;
    const descriptionIsValid = formData.description.length >= 10 && formData.description.length <= 300;
    const costIsValid = Number(formData.cost) >= 100 && Number(formData.cost) <= 300;
    const durationIsValid = Number(formData.duration) >= 1 && Number(formData.duration) <= 7;


    useEffect(() => {
        if (titleIsValid &&
           descriptionIsValid &&
           costIsValid &&
           durationIsValid) setFormValid(true);

        else setFormValid(false);
    }, [formData]);


    const handleInputChange = (e) => {
         setFormData({
            ...formData,
            [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
       e.preventDefault();
       if (!formValid) return;

       const form = new FormData();
       form.append('image', e.target.image.files[0]);
       form.append('data', JSON.stringify(formData));

        fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/services/add`, {
            method: 'POST',
            credentials: 'include',
            body: form
        }).then(response => response.json())
          .then(result => {
               if (result.err) addToast('error', result.err);
               else {
                  addToast('success', result.message);
                  setServices(services => [...services, result.service]);
                  setSelectedImage(null);
                  setFormData({
                     title: '',
                     description: '',
                     cost: '',
                     duration: '',
                     categoryId: 1
                  });
               }
         }).catch(() => addToast('error', 'Il y a eu un problème'));
    }

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) setSelectedImage(URL.createObjectURL(file));
   };


   return <>

       <form
          className={'add-service-form'}
          onSubmit={handleSubmit}
          encType={'multipart/form-data'}>
             <label htmlFor={'title'}>Titre</label>
             <input
                id={"title"}
                type="text"
                name="title"
                value={formData.title}
                placeholder={"Titre du service"}
                onChange={handleInputChange} />
             {!titleIsValid && <span>Entre 5 et 30 caractères</span>}


             <label htmlFor={'description'}>Description</label>
             <textarea
                value={formData.description}
                id={"description"}
                name="description"
                placeholder={"Description du service"}
                onChange={handleInputChange}></textarea>
           {!descriptionIsValid && <span>Entre 10 et 300 caractères</span>}


             <label htmlFor={'cost'}>Coût</label>
             <input
                value={formData.cost}
                id={"cost"}
                type="number"
                name="cost"
                placeholder={'Coût en communiToken'}
                onChange={handleInputChange} />
           {!costIsValid && <span>Entre 100 et 300 communiToken</span>}


             <label htmlFor={'duration'}>Durée (en heures)</label>
             <input
                value={formData.duration}
                id={"duration"}
                type="number"
                name="duration"
                placeholder={'entre 1 heure et 7 heures'}
                onChange={handleInputChange} />
           {!durationIsValid && <span>Entre 1 heure et 7 heures</span>}


             <label htmlFor={'category'}>Catégorie</label>
             <select
                value={formData.category}
                id={"category"}
                name="categoryId"
                onChange={handleInputChange}>
                {categories.map(category => (
                   <option
                      key={category.id}
                      value={category.id}>{category.name}</option>
                ))}

             </select>


          <label htmlFor={'image'}>Image d&apos;illustration</label>
          <input
             type="file"
             id={'image'}
             name={'image'}
             onChange={handleImageChange}/>
          {selectedImage && <img src={selectedImage} alt={'service preview'} />}


             <button
                disabled={!formValid}
                type="submit"
                className={`btn btn-primary ${!formValid ? 'disabled-btn' : ""}`}>Ajouter</button>
       </form>
   </>

}