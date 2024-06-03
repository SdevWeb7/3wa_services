import { useContext, useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner.jsx";
import { useAppStore } from "../../utils/store.js";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../hooks/MyContextProvider.jsx";

export const AuthForm = () => {
    const navigation = useNavigate();
    const { user, setUser } = useContext(myContext);
    const addToast = useAppStore.use.addToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState('login');
    const [pseudonyme, setPseudonyme] = useState('');
    const [isValid, setIsValid] = useState(false);
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    useEffect(() => {
        if (action === 'login') {
            if (regexEmail.test(email) && password.length > 3) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        } else {
            if (regexEmail.test(email) && password.length > 3 && pseudonyme.length > 3) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        }
    }, [password, email, pseudonyme, action]);



    const handleForm = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/auth/${action}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                pseudonyme: pseudonyme
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
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   placeholder={"Votre e-mail"}/>
                {! regexEmail.test(email) && <span>Exemple : test@test.fr</span>}


                <label className={'label'} htmlFor="password">Votre mot de passe</label>
                <input
                   className={"input"}
                   type="password"
                   name={'password'}
                   id={"password"}
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   placeholder={'Votre mot de passe'}/>
                {password.length < 4 && <span>Au moins 4 caractères</span>}

                {action === 'subscribe' && <>
                    <label className={'label'} htmlFor="pseudonyme">Choisissez un pseudonyme</label>
                    <input
                       onChange={e => setPseudonyme(e.target.value)}
                       className={"input"}
                       type="pseudonyme"
                       name={'pseudonyme'}
                       id={"pseudonyme"}
                       placeholder={'Entrez votre pseudonyme'} />
                    {pseudonyme.length < 4 && <span>Au moins 4 caractères</span>}</>}

                <div className="radios">
                    <label htmlFor="login">Se connecter</label>
                    <input
                       onChange={e => setAction(e.target.value)}
                       type="radio"
                       value={'login'}
                       defaultChecked={true}
                       name={"action"}
                       id={'login'}/>

                    <label htmlFor="subscribe">S&apos;inscrire</label>
                    <input
                       onChange={e => setAction(e.target.value)}
                       type="radio"
                       value={'subscribe'}
                       name={"action"}
                       id={'subscribe'}/>
                </div>

                <button
                   className={`btn btn-tertiary ${isValid ? '' : 'disabled-btn'}`}
                   type="submit"
                   disabled={! isValid}>Valider</button>
            </form>
        </>;
}