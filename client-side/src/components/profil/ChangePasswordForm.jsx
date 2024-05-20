import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../hooks/MyContextProvider.jsx";
import { useAppStore } from "../../utils/store.js";

export const ChangePasswordForm = () => {
    const navigation = useNavigate();
    const { user, setUser } = useContext(myContext);
    const addToast = useAppStore.use.addToast();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isValid, setIsValid] = useState(false);
    const deleteModal = useRef(null);

    useEffect(() => {
        if (password.length > 3 && password === passwordConfirm && oldPassword.length > 3) setIsValid(true);
        else setIsValid(false);
    }, [password, passwordConfirm, oldPassword]);

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


    const handleLogout = async () => {
        const response = await fetch('http://localhost:3000/api/auth/logout', {
            credentials: 'include'
        });

        const result = await response.json();
        if (!result.err) {
            setUser({});
            navigation('/');
            addToast('success', result.message);
        } else addToast('error', result.message);
    }
    const handleForm = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const response = await fetch(`http://localhost:3000/api/auth/edit`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                oldPassword: data.get('oldPassword'),
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
        const response = await fetch(`http://localhost:3000/api/auth/delete`, {
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
   return <>
       <form style={{marginTop: "3rem"}} className={"auth-form"} onSubmit={handleForm}>
           <h2>Changer mon mode de passe</h2>

           <label className={'label'} htmlFor={"oldPassword"}>Votre ancien mot de passe</label>
           <input
              className={'input'}
              type="password"
              name={'oldPassword'}
              id={"oldPassword"}
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder={"Votre ancien mot de passe"}/>
           {oldPassword.length < 4 && <span>Au moins 4 caractères</span>}

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


       <div className="profil-actions">
           <button
              className={"btn btn-secondary logout-btn"}
              onClick={handleLogout}>Déconnexion
           </button>

           <button
              onClick={openDeleteModal}
              className="btn btn-danger delete-btn">Supprimer mon profil
           </button>
       </div>

       <dialog ref={deleteModal} className={"delete-user-modal"}>
           <form onSubmit={handleDeleteForm}>
               <h2>Vous êtes sur le point de supprimer votre compte.</h2>
               <p className={'warning'}>Attention cette opération est irréversible !</p>
               <label htmlFor={"confirmDelete"}>Tapez &quot;Supprimer&quot; pour supprimer définitivement votre
                   compte.</label>
               <input type="text" name="confirmDelete" id={"confirmDelete"}/>
               <button type={"submit"} className="btn btn-danger">Je suis sur</button>
           </form>
           <button className="btn btn-success" onClick={closeModal}>Annuler</button>
       </dialog>
   </>

}