import { useEffect, useState } from "react";

export const AuthForm = () => {
    const navigation = useNavigation();
    const addToast = useAppStore.use.addToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


    useEffect(() => {
        if (regexEmail.test(email) && password.length > 3) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [password, email]);



    const handleForm = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const action = data.get('action') === "subscribe" ? 'subscribe' : 'login';

        const response = await fetch(`http://127.0.0.1:3000/api/auth/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password')
            }),
        })

        const result = await response.json();

        if (!result.err) {
            navigation('/')
            addToast('success', result.message);
        } else {
            addToast('error', result.message);
        }
    }

    const handleLogout = async () => {
         const response = await fetch('http://127.0.0.1:3000/api/auth/logout');

         const result = await response.json();
         if (!result.err) {
             navigation('/')
             addToast('success', result.message);
         } else {
             addToast('error', result.message);
         }
    }


   return <main className={'main'}>
       <h1>Authentification</h1>

       <button
          className={"btn btn-secondary logout-btn"}
          onClick={handleLogout}>Se déconnecter</button>

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
           {!regexEmail.test(email) && <span>Exemple : test@test.fr</span>}


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
   </main>

}