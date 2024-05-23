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
    const [isValid, setIsValid] = useState(false);
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    useEffect(() => {
        if (regexEmail.test(email) && password.length > 3) setIsValid(true);
        else setIsValid(false);
    }, [password, email]);



    const handleForm = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const action = data.get('action') === "subscribe" ? 'subscribe' : 'login';

        const response = await fetch(`${import.meta.env.VITE_BASE_URL_BACKENDL}/api/auth/${action}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password')
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

            <form className={"auth-form"} onSubmit={handleForm}>
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


                <div className="radios">
                    <label htmlFor="login">Se connecter</label>
                    <input
                       type="radio"
                       name={"action"}
                       value={'login'}
                       defaultChecked={true}
                       id={'login'}/>

                    <label htmlFor="subscribe">S&apos;inscrire</label>
                    <input
                       type="radio"
                       name={"action"}
                       value={'subscribe'}
                       id={'subscribe'}/>
                </div>

                <button
                   className={`btn btn-tertiary ${isValid ? '' : 'disabled-btn'}`}
                   type="submit"
                   disabled={! isValid}>Valider</button>
            </form>
        </>;
}