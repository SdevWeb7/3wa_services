import { useContext, useRef, useState } from "react";
import { myContext } from "../../hooks/MyContextProvider.jsx";
import { useAppStore } from "../../utils/store.js";
import { useNavigate } from "react-router-dom";

export const ProfilActions = () => {
   const { setUser } = useContext(myContext);
   const [confirmDelete, setConfirmDelete] = useState('');
   const addToast = useAppStore.use.addToast();
   const navigation = useNavigate();
   const deleteModal = useRef(null);


   const deleteUser = async (e) => {
      e.preventDefault();

      if (confirmDelete !== 'Supprimer') {
         addToast('error', 'Veuillez taper "Supprimer" pour supprimer votre compte.');
         return;
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/auth/delete`, {
         method: 'DELETE',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
      })

      const result = await response.json();
      if (!result.err) {
         setUser({});
         addToast('success', result.message);
         navigation('/');
      } else addToast('error', result.message);

   }

   const handleLogout = async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/auth/logout`, {
         credentials: 'include'
      });

      const result = await response.json();
      if (!result.err) {
         setUser({});
         navigation('/');
         addToast('success', result.message);
      } else addToast('error', result.message);
   }


      return <><div className="profil-actions">
            <button
               className={"btn btn-secondary logout-btn"}
               onClick={handleLogout}>Déconnexion
            </button>

            <button
               aria-haspopup={'dialog'}
               onClick={() => deleteModal.current.showModal()}
               className="btn btn-danger delete-btn">Supprimer mon profil
            </button>
         </div>



         <dialog
            ref={deleteModal}
            className={"delete-user-modal"}>

            <form onSubmit={deleteUser}>

               <h2 style={{color: 'var(--text)'}}>Vous êtes sur le point de supprimer votre compte.</h2>

               <p className={'warning'}>Attention cette opération est irréversible !</p>

               <label htmlFor={"confirmDelete"}>Tapez &quot;Supprimer&quot; pour supprimer définitivement votre compte.</label>


               <input
                  type="text"
                  name="confirmDelete"
                  value={confirmDelete}
                  onChange={e => setConfirmDelete(e.target.value)}
                  id={"confirmDelete"} />

               <button
                  type={"submit"}
                  className="btn btn-danger">Je suis sur</button>
            </form>

            <button
               aria-label={'Annuler et fermer la modal'}
               className="btn btn-success"
               onClick={() => deleteModal.current.close()}>Annuler</button>
         </dialog></>;
}