
export const AuthForm = () => {

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
            window.location = '/';
        }
    }

    const handleLogout = async () => {
         const response = await fetch('http://127.0.0.1:3000/api/auth/logout');

         const result = await response.json();
         if (!result.err) {
             window.location = '/';
         }
    }

   return <>
       <h1>Authentification</h1>

       <button onClick={handleLogout}>Se déconnecter</button>

       <form className={"auth-form"} onSubmit={handleForm}>
           <label htmlFor={"email"}>Votre e-mail</label>
           <input
              type="text"
              name={'email'}
              id={"email"}
              placeholder={"Votre e-mail"} />

           <label htmlFor="password">Votre mot de passe</label>
           <input
              type="password"
              name={'password'}
              id={"password"}
              placeholder={'Votre mot de passe'} />


           <div className="radios">
               <label htmlFor="login">Se connecter</label>
               <input
                  type="radio"
                  name={"action"}
                  value={'login'}
                  defaultChecked={true}
                  id={'login'} />

               <label htmlFor="subscribe">S'inscrire</label>
               <input
                  type="radio"
                  name={"action"}
                  value={'subscribe'}
                  id={'subscribe'}/>
           </div>

           <input type="submit"value={"Valider"}/>
       </form>
   </>

}