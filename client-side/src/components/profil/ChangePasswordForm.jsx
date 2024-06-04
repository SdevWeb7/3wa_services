import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../utils/store.js";
import { ProfilActions } from "./ProfilActions.jsx";

export const ChangePasswordForm = () => {
    const navigation = useNavigate();
    const addToast = useAppStore.use.addToast();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (password.length > 3 &&
           password === passwordConfirm &&
           oldPassword.length > 3) setIsValid(true);

        else setIsValid(false);
    }, [password, passwordConfirm, oldPassword]);


    const handleForm = async (e) => {
        e.preventDefault();

        if (!isValid) {
            addToast('error', 'Veuillez remplir correctement le formulaire');
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/auth/edit`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                oldPassword: oldPassword,
                password: password
            })
        })

        const result = await response.json();

        if (!result.err) {
            navigation('/');
            addToast('success', result.message);
        } else addToast('error', result.message);
    }


   return <>
       <form
          style={{marginTop: "3rem"}}
          className={"form"}
          onSubmit={handleForm}>

           <h3>Changer mon mode de passe</h3>

           <label
              className={'label'}
              htmlFor={"oldPassword"}>Votre ancien mot de passe</label>
           <input
              className={'input'}
              type="password"
              name={'oldPassword'}
              id={"oldPassword"}
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              placeholder={"Votre ancien mot de passe"}/>
           {oldPassword.length < 4 && <span>Au moins 4 caractères</span>}


           <label
              className={'label'}
              htmlFor={"password"}>Votre nouveau mot de passe</label>
           <input
              className={'input'}
              type="password"
              name={'password'}
              id={"password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={"Votre nouveau mot de passe"}/>
           {password.length < 4 && <span>Au moins 4 caractères</span>}


           <label
              className={'label'}
              htmlFor="passwordConfirm">Confirmer votre nouveau mot de passe</label>
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
              disabled={! isValid}>Valider</button>
       </form>

        <ProfilActions />
   </>

}