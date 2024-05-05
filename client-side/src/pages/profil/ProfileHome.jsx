import { ProfilNavbar } from "./ProfilNavbar.jsx";
import { useAppStore } from "../../utils/store.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ProfileHome = () => {
   const navigation = useNavigate();
   const user = useAppStore.use.user();
   const addToast = useAppStore.use.addToast();
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');
   const [isValid, setIsValid] = useState(false);
   const deleteModal = useRef(null);

   useEffect(() => {
      if (password.length > 3 && password === passwordConfirm) setIsValid(true);
      else setIsValid(false);
   }, [password, passwordConfirm]);

   const handleForm = async (e) => {
      e.preventDefault();

      const data = new FormData(e.target);

      const response = await fetch(`http://127.0.0.1:3000/api/auth/edit/${user.id}`, {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            password: data.get('password')
         })
      })

      const result = await response.json();

      if (!result.err) {
         navigation('/');
         addToast('success', result.message);
      } else addToast('error', result.message);
   }

   const deleteUser = async () => {
      const response = await fetch(`http://127.0.0.1:3000/api/auth/delete/${user.id}`, {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
      })

      const result = await response.json();
      if (!result.err) {
         navigation('/');
         addToast('success', result.message);
      } else addToast('error', result.message);

   }

   const openDeleteModal = () => {
      deleteModal.current.showModal();
   }
   const closeModal = () => {
      deleteModal.current.close();
   }
   const handleDeleteForm = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      if (data.get('confirmDelete') === 'Supprimer') {
         deleteUser()
      }
      else addToast('error', 'Veuillez taper "Supprimer" pour supprimer votre compte');
   }


   return <>

      <ProfilNavbar/>

      <h1>Profil</h1>


      <p style={{textAlign: 'center'}}>Bienvenue sur votre profil.</p>

      <p style={{textAlign: 'center'}}>Vous pouvez ici modifier vos informations personnelles.</p>


      <form style={{marginTop: "3rem"}} className={"auth-form"} onSubmit={handleForm}>
      <h2>Changer mon mode de passe</h2>

         <label className={'label'} htmlFor={"password"}>Votre nouveau mot de passe</label>
         <input
            className={'input'}
            type="password"
            name={'password'}
            id={"password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={"Votre nouveau mot de passe"}/>
         {password.length < 4 && <span>Au moins 4 caractères</span>}

         <label className={'label'} htmlFor="passwordConfirm">Confirmer votre nouveau mot de passe</label>
         <input
            className={"input"}
            type="password"
            name={'passwordConfirm'}
            id={"passwordConfirm"}
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            placeholder={'Confirmer votre nouveau mot de passe'}/>
         {passwordConfirm !== password && <span>Les deux mots de passe doivent correspondre</span>}


         <button
            className={`btn btn-tertiary ${isValid ? '' : 'disabled-btn'}`}
            type="submit"
            disabled={! isValid}>Valider
         </button>
      </form>


      <button
         onClick={openDeleteModal}
         className="btn btn-danger delete-btn">Supprimer mon profil</button>


      <dialog ref={deleteModal} className={"delete-user-modal"}>
         <form onSubmit={handleDeleteForm}>
            <h2>Vous êtes sur le point de supprimer votre compte.</h2>
            <p className={'warning'}>Attention cette opération est irréversible !</p>
            <label htmlFor={"confirmDelete"}>Tapez &quot;Supprimer&quot; pour supprimer définitivement votre compte.</label>
            <input type="text" name="confirmDelete" id={"confirmDelete"} />
            <button type={"submit"} className="btn btn-danger">Je suis sur</button>
         </form>
            <button className="btn btn-success" onClick={closeModal}>Annuler</button>
      </dialog>
   </>;

}