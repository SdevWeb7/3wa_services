import { useContext, useState } from "react";
import { Spinner } from "../../components/Spinner.jsx";
import { useAppStore } from "../../utils/store.js";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../hooks/MyContextProvider.jsx";

export const AuthForm = () => {
    const navigation = useNavigate();
    const { user, setUser } = useContext(myContext);
    const addToast = useAppStore.use.addToast();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        pseudonyme: '',
        action: 'login'
    });
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const regexPassword = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    const regexPassword = /.*/;
    const isEmailValid = regexEmail.test(formData.email);
    const isPasswordValid = formData.password.length > 7 && regexPassword.test(formData.password);
    const isPseudonymeValid = formData.pseudonyme.length > 2;
    const isFormValid = formData.action === "login" ? isEmailValid && isPasswordValid : isEmailValid && isPasswordValid && isPseudonymeValid;




    const handleForm = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/auth/${formData.action}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                pseudonyme: formData.pseudonyme
            }),
        })

        const result = await response.json();

        if (!result.err) {
            setUser(result.user);
            addToast('success', result.message);
            navigation('/');
        } else {
            addToast('error', result.message);
        }
    }
    const handleInputChanges = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
    }



    if (!user) return <Spinner />

    else if (Object.keys(user).length > 0) window.location.href = '/profil';


    else return <>

            <h1>Authentification</h1>

            <form className={"form"} onSubmit={handleForm}>
                <label className={'label'} htmlFor={"email"}>Votre e-mail</label>
                <input
                   className={'input'}
                   type="email"
                   name={'email'}
                   id={"email"}
                   value={formData.email}
                   onChange={handleInputChanges}
                   placeholder={"Votre e-mail"}/>
                {!isEmailValid && <span>Exemple : test@test.fr</span>}


                <label className={'label'} htmlFor="password">Votre mot de passe</label>
                <input
                   className={"input"}
                   type="password"
                   name={'password'}
                   id={"password"}
                   value={formData.password}
                   onChange={handleInputChanges}
                   placeholder={'Votre mot de passe'}/>
                {!isPasswordValid && <span>Au moins 8 caractères</span>}

                {formData.action === 'subscribe' && <>
                    <label className={'label'} htmlFor="pseudonyme">Choisissez un pseudonyme</label>
                    <input
                       onChange={handleInputChanges}
                       className={"input"}
                       type="pseudonyme"
                       name={'pseudonyme'}
                       id={"pseudonyme"}
                       placeholder={'Entrez votre pseudonyme'} />
                    {!isPseudonymeValid && <span>Au moins 3 caractères</span>}</>}

                <div className="radios">
                    <label htmlFor="login">Se connecter</label>
                    <input
                       onChange={handleInputChanges}
                       type="radio"
                       value={'login'}
                       defaultChecked={true}
                       name={"action"}
                       id={'login'}/>

                    <label htmlFor="subscribe">S&apos;inscrire</label>
                    <input
                       onChange={handleInputChanges}
                       type="radio"
                       value={'subscribe'}
                       name={"action"}
                       id={'subscribe'}/>
                </div>

                <button
                   className={`btn btn-tertiary ${isFormValid ? '' : 'disabled-btn'}`}
                   type="submit"
                   disabled={! isFormValid}>Valider</button>
            </form>
        </>;
}